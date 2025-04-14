import { genSaltSync, hashSync, compareSync } from "bcryptjs";
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

        const userData = jwtData['user'];
        const user = new User(
            userData.id,
            userData.username,
            userData.document,
            userData.documentType,
            userData.password,
            userData.email,
            userData.status,
            userData.firstName,
            userData.secondName,
            userData.firstSurname,
            userData.secondSurname
          );

        const payload : AuthPayload = {
            user : user,
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