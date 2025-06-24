import { inject, injectable } from "tsyringe";
import { IRegisterStrategy } from "./register-strategy.interface";
import { ClientDTO, UserDTO } from "@/shared/dto/user.dto";
import { IClientRepository } from "@/entities/repositoryInterfaces/client/client-repository.interface";
import { CustomError } from "@/entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";
import { IBcrypt } from "@/frameworks/security/bcrypt.interface";
import { generateUniqueId } from "@/frameworks/security/uniqueuid.bcrypt";
import { IUserEntity } from "@/entities/models/user.entity";

@injectable()
export class ClientRegisterStrategy implements IRegisterStrategy {
  private _clientRepository : IClientRepository
  private _passwordBcrypt : IBcrypt
  constructor(
    @inject("IClientRepository")  clientRepository: IClientRepository,
    @inject("IPasswordBcrypt")  passwordBcrypt: IBcrypt
  ) {
    this._clientRepository = clientRepository
    this._passwordBcrypt = passwordBcrypt
  }

  async register(user: UserDTO): Promise<IUserEntity | null> {
    if (user.role !== "client") {
      throw new CustomError("Invalid role for client registration", HTTP_STATUS.BAD_REQUEST);
    }

    const existingClient = await this._clientRepository.findByEmail(user.email);
    if (existingClient) {
      throw new CustomError(ERROR_MESSAGES.EMAIL_EXISTS, HTTP_STATUS.CONFLICT);
    }

    const { firstName, lastName, email, password ,phoneNumber ,googleId} = user as ClientDTO;
    let hashedPassword = password ? await this._passwordBcrypt.hash(password) : "";
    const clientId = generateUniqueId("client");


    const isGoogleAuth = !!googleId;
    const finalPassword = isGoogleAuth ? undefined : hashedPassword ?? ""; 
    const finalPhoneNumber = phoneNumber || (isGoogleAuth ? undefined : "");
    const savedClient = await this._clientRepository.save({
      firstName,
      lastName,
      email,
      password: finalPassword,
      clientId,
      phoneNumber: finalPhoneNumber,
      role: "client",
      googleId: googleId || undefined,
    });

    if (!savedClient) {
      return null; 
    }

    return savedClient; 
  }
}