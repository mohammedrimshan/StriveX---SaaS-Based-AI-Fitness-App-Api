import { inject, injectable } from "tsyringe";
import { IResetPasswordUseCase } from "@/entities/useCaseInterfaces/auth/reset-password-usecase.interface";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";
import { CustomError } from "@/entities/utils/custom.error";
import { ITokenService } from "@/entities/services/token-service.interface";
import { IRedisTokenRepository } from "@/entities/repositoryInterfaces/redis/redis-token-repository.interface";
import { IBcrypt } from "@/frameworks/security/bcrypt.interface";
import { ResetTokenPayload } from "@/interfaceAdapters/services/jwt.service";
import { IClientRepository } from "@/entities/repositoryInterfaces/client/client-repository.interface";
import { ITrainerRepository } from "@/entities/repositoryInterfaces/trainer/trainer-repository.interface";
import { IAdminRepository } from "@/entities/repositoryInterfaces/admin/admin-repository.interface";

@injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    @inject("IClientRepository") private _clientRepository: IClientRepository,
    @inject("ITrainerRepository") private _trainerRepository: ITrainerRepository,
    @inject("IAdminRepository") private _adminRepository: IAdminRepository,
    @inject("ITokenService") private _tokenService: ITokenService,
    @inject("IRedisTokenRepository") private _redisTokenRepository: IRedisTokenRepository,
    @inject("IPasswordBcrypt") private _passwordBcrypt: IBcrypt
  ) {}

  async execute({
    password,
    role,
    token,
  }: {
    password: string;
    role: string;
    token: string;
  }): Promise<void> {
    console.log("\n======== Reset Password Use Case Started ========");
    console.log(`Received Data -> Password: [HIDDEN], Role: ${role}, Token: ${token.substring(0, 10)}...`);

    const payload = this._tokenService.verifyResetToken(token) as ResetTokenPayload & { role?: string };
    console.log("Decoded Token Payload:", payload);

    if (!payload || !payload.email) {
      console.error("❌ Invalid token - Missing email");
      throw new CustomError(ERROR_MESSAGES.INVALID_TOKEN, HTTP_STATUS.BAD_REQUEST);
    }

    const email = payload.email;
    const roleToUse = payload.role || role; 
    console.log(`Extracted Email from Token: ${email}`);
    console.log(`Using Role: ${roleToUse} (Token: ${payload.role}, Request: ${role})`);

    let repository;
    if (roleToUse === "client") {
      repository = this._clientRepository;
    } else if (roleToUse === "trainer") {
      repository = this._trainerRepository;
    } else if (roleToUse === "admin") {
      repository = this._adminRepository;
    } else {
      console.error(`❌ Invalid Role Provided: ${roleToUse}`);
      throw new CustomError(ERROR_MESSAGES.INVALID_ROLE, HTTP_STATUS.FORBIDDEN);
    }
    console.log(`Selected Repository: ${repository.constructor.name}`);

    // Find the user by email
    const user = await repository.findByEmail(email);
    console.log("User Retrieved from Database:", user);

    if (!user) {
      console.error(`❌ User not found with email: ${email}`);
      throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    // Verify token validity from Redis
    const tokenValid = await this._redisTokenRepository.verifyResetToken(user.id ?? "", token);
    console.log(`Token Valid in Redis: ${tokenValid}`);

    if (!tokenValid) {
      console.error("❌ Reset Token is Invalid or Expired");
      throw new CustomError(ERROR_MESSAGES.INVALID_TOKEN, HTTP_STATUS.BAD_REQUEST);
    }

    // Compare new password with old one
    const isSamePasswordAsOld = await this._passwordBcrypt.compare(password, user.password);
    console.log(`Password Match with Old: ${isSamePasswordAsOld}`);

    if (isSamePasswordAsOld) {
      console.error("❌ New password cannot be the same as the old password");
      throw new CustomError(ERROR_MESSAGES.SAME_CURR_NEW_PASSWORD, HTTP_STATUS.BAD_REQUEST);
    }

    // Hash the new password
    const hashedPassword = await this._passwordBcrypt.hash(password);
    console.log(`New Password Hashed: ${hashedPassword.substring(0, 10)}...`);

    await repository.updateByEmail(email, { password: hashedPassword });
    console.log("✅ Password successfully updated in the database");

    await this._redisTokenRepository.deleteResetToken(user.id ?? "");
    console.log("✅ Reset token deleted from Redis");

    console.log("======== Reset Password Use Case Completed ========");
  }
}