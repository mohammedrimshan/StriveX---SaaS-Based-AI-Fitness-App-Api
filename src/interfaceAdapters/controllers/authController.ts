import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { IAuthController } from "@/entities/controllerInterfaces/auth-controller.interface";
import { IGoogleUseCase } from "@/entities/useCaseInterfaces/auth/google-auth.usecase.interface";
import { IGenerateTokenUseCase } from "@/entities/useCaseInterfaces/auth/generate-token-usecase.interface";
import { ILoginUserUseCase } from "@/entities/useCaseInterfaces/auth/login-usecase.interface";
import { IBlackListTokenUseCase } from "@/entities/useCaseInterfaces/auth/blacklist-token-usecase.interface";
import { IRevokeRefreshTokenUseCase } from "@/entities/useCaseInterfaces/auth/revoke-refresh-token-usecase.interface";
import { IRefreshTokenUseCase } from "@/entities/useCaseInterfaces/auth/refresh-token-usecase.interface";
import { IRegisterUserUseCase } from "@/entities/useCaseInterfaces/auth/register-usecase.interface";
import { ISendOtpEmailUseCase } from "@/entities/useCaseInterfaces/auth/send-otp-usecase.interface";
import { IVerifyOtpUseCase } from "@/entities/useCaseInterfaces/auth/verify-otp-usecase.interface";
import {
  setAuthCookies,
  clearAuthCookies,
  updateCookieWithAccessToken,
} from "@/shared/utils/cookieHelper";
import {
  SUCCESS_MESSAGES,
  HTTP_STATUS,
  ERROR_MESSAGES,
} from "@/shared/constants";
import { LoginUserDTO, UserDTO } from "@/shared/dto/user.dto";
import { loginSchema } from "./auth/validations/user-login.validation.schema";
import { userSchemas } from "./auth/validations/user-signup.validation.schema";
import { otpMailValidationSchema } from "./auth/validations/otp-mail.validation.schema";
import { CustomRequest } from "../middlewares/auth.middleware";
import { handleErrorResponse } from "@/shared/utils/errorHandler";
import { IForgotPasswordUseCase } from "@/entities/useCaseInterfaces/auth/forgot-password-usecase.interface";
import { forgotPasswordValidationSchema } from "./auth/validations/forgot-password.validation.schema";
import { IResetPasswordUseCase } from "@/entities/useCaseInterfaces/auth/reset-password-usecase.interface";
import { resetPasswordValidationSchema } from "./auth/validations/reset-password.validation.schema";
import { ZodError } from "zod";


@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject("IGoogleUseCase")
    private _googleUseCase: IGoogleUseCase,
    @inject("IGenerateTokenUseCase")
    private _generateTokenUseCase: IGenerateTokenUseCase,
    @inject("ILoginUserUseCase")
    private _loginUserUseCase: ILoginUserUseCase,
    @inject("IBlackListTokenUseCase")
    private _blackListTokenUseCase: IBlackListTokenUseCase,
    @inject("IRevokeRefreshTokenUseCase")
    private _revokeRefreshToken: IRevokeRefreshTokenUseCase,
    @inject("IRefreshTokenUseCase")
    private _refreshTokenUseCase: IRefreshTokenUseCase,
    @inject("IRegisterUserUseCase")
    private _registerUserUseCase: IRegisterUserUseCase,
    @inject("ISendOtpEmailUseCase")
    private _sendOtpEmailUseCase: ISendOtpEmailUseCase,
    @inject("IVerifyOtpUseCase")
    private _verifyOtpUseCase: IVerifyOtpUseCase,
    @inject("IForgotPasswordUseCase")
    private _forgotPasswordUseCase: IForgotPasswordUseCase,
    @inject("IResetPasswordUseCase")
    private _resetPasswordUseCase: IResetPasswordUseCase
  ) {}

  //*                  🔑 Google Authentication
  async authenticateWithGoogle(req: Request, res: Response): Promise<void> {
    try {
      const { credential, client_id, role } = req.body;
      const user = await this._googleUseCase.execute(
        credential,
        client_id,
        role
      );
      if (!user.id || !user.email || !user.role) {
        throw new Error("User ID, email, or role is missing");
      }

      const tokens = await this._generateTokenUseCase.execute(
        user.id,
        user.email,
        user.role
      );

      const accessTokenName = `${user.role}_access_token`;
      const refreshTokenName = `${user.role}_refresh_token`;

      setAuthCookies(
        res,
        tokens.accessToken,
        tokens.refreshToken,
        accessTokenName,
        refreshTokenName
      );
    
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        user: user,
      });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  //*                  🔔 Forgot Password
  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = forgotPasswordValidationSchema.parse(req.body);
      if (!validatedData) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
        });
      }
      await this._forgotPasswordUseCase.execute(validatedData);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.EMAIL_SENT_SUCCESSFULLY,
      });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  //*                  🛠️ User Login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as LoginUserDTO;
      const validatedData = loginSchema.parse(data);
      if (!validatedData) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.INVALID_CREDENTIALS,
        });
      }
      const user = await this._loginUserUseCase.execute(validatedData);

      if (!user.id || !user.email || !user.role) {
        throw new Error("User ID, email, or role is missing");
      }

      const tokens = await this._generateTokenUseCase.execute(
        user.id,
        user.email,
        user.role
      );

      const accessTokenName = `${user.role}_access_token`;
      const refreshTokenName = `${user.role}_refresh_token`;

      setAuthCookies(
        res,
        tokens.accessToken,
        tokens.refreshToken,
        accessTokenName,
        refreshTokenName
      );

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        user:user
      });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  //*                  🚪 User Logout
  async logout(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as CustomRequest).user;
      if (!user.access_token || !user.refresh_token) {
        throw new Error("Missing access or refresh token");
      }
  
      await this._blackListTokenUseCase.execute(user.access_token);
     
      await this._revokeRefreshToken.execute(user.refresh_token);
  
      const accessTokenName = `${user.role}_access_token`;
      const refreshTokenName = `${user.role}_refresh_token`;
      clearAuthCookies(res, accessTokenName, refreshTokenName);
  
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
      });
    } catch (error: unknown) {
      handleErrorResponse(res, error);
    }
  }
  
  //*                  🔄 Token Refresh
  handleTokenRefresh(req: Request, res: Response): void {
    try {
      const refreshToken = (req as CustomRequest).user.refresh_token;
      const newTokens = this._refreshTokenUseCase.execute(refreshToken);
      const accessTokenName = `${newTokens.role}_access_token`;
      updateCookieWithAccessToken(res, newTokens.accessToken, accessTokenName);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.OPERATION_SUCCESS,
      });
    } catch (error) {
      clearAuthCookies(
        res,
        `${(req as CustomRequest).user.role}_access_token`,
        `${(req as CustomRequest).user.role}_refresh_token`
      );
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: ERROR_MESSAGES.INVALID_TOKEN,
      });
    }
  }

  //*                  📝 User Registration
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.body as UserDTO;

      const schema = userSchemas[role];

      if (!schema) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.INVALID_ROLE,
        });
        return;
      }

      const validatedData = schema.parse(req.body);

      await this._registerUserUseCase.execute(validatedData);

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS,
      });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  //*                  🔒 Reset Password
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = resetPasswordValidationSchema.parse(req.body);
      if (!validatedData) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
        });
      }

      await this._resetPasswordUseCase.execute(validatedData);
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS,
      });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  //*                  📧 Send OTP Email
  async sendOtpEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await this._sendOtpEmailUseCase.execute(email);
      res.status(HTTP_STATUS.OK).json({
        message: SUCCESS_MESSAGES.OTP_SENT_SUCCESS,
        success: true,
      });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  //*                  ✅ Verify OTP
  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = req.body;

      console.log(email,otp ,"from verify otp");
      const validatedData = otpMailValidationSchema.parse({ email, otp });
      await this._verifyOtpUseCase.execute(validatedData);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.VERIFICATION_SUCCESS,
      });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
}
