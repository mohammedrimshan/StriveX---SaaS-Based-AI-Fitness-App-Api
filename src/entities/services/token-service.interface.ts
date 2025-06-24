import { JwtPayload } from "jsonwebtoken";

export interface ITokenService {
	generateAccessToken(payload: {
		id: string;
		email: string;
		role: string;
	}): string;
	generateRefreshToken(payload: {
		id: string;
		email: string;
		role: string;
	}): string;
	verifyAccessToken(token: string): string | JwtPayload | null;
	verifyRefreshToken(token: string): string | JwtPayload | null;
	decodeAccessToken(token: string): JwtPayload | null;
	generateResetToken(email: string, role: string): string;
	verifyResetToken(token: string): JwtPayload | null;
	decodeResetToken(token: string): JwtPayload | null;
	
}
