import { User } from "../../domain/entities/User";
import { LoginDTO, LoginResponseDTO } from "../dto/auth";

export type AuthPayload = {

    user : User,
    roles : string[],

}

export interface IAuthService {

    hash( password : string ) : string;
    compare( password : string, hashed : string ) : boolean;

    verifyToken( token: string) : AuthPayload | null;
    generateToken( payload : AuthPayload ) : string;

}