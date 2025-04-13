import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import { verify, sign, JwtPayload } from "jsonwebtoken";
import { IAuthService, AuthPayload } from "../../application/services/IAuthService";
import { config } from '../config/config';
import { User } from "../../domain/entities/User";

export interface AuthServiceConfig {
    jwtSecret : string;
}

export class AuthService implements IAuthService {

    config : AuthServiceConfig;

    constructor(
        config : AuthServiceConfig
    ) {
        this.config = config;
    }

    public hash( password : string ) : string {
        const salt = genSaltSync();
        return hashSync( password, salt );
    }

    public compare( password : string, hashed : string) : boolean {
        return compareSync( password, hashed );
    }

    public verifyToken( token: string) : AuthPayload | null {
        const data = verify( token, config.jwtSecret );

        if ( !data ) return null;

        const jwtData : JwtPayload = <JwtPayload>data;

        const payload : AuthPayload = {
            user : <User>jwtData['user'],
            roles : jwtData['roles'],
        }

        return payload;
    }

    public generateToken( payload : AuthPayload ) : string {
        return sign(
            payload, config.jwtSecret, {
                expiresIn: "1 Week"
            }
        )
    }

}