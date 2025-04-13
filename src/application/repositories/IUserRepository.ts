import { Privilege } from "../../domain/entities/Privilege";
import { User } from "../../domain/entities/User";


export interface IUserRepository {

    checkUserExistence(
        document : string, documentType : string,
        username : string, email : string
    ) : Promise<boolean>;

    findByDocument( document : string, documentType : string ) : Promise<User | null>;
    findByUsernameOrEmail( usernameOrEmail : string ) : Promise<User | null>;
    findByUsername( username : string ) : Promise<User | null>;
    findByEmail( email : string ) : Promise<User | null>;

    getUserRoles( user : User ) : Promise<Privilege[]>;

    save(
        username: string,
        document: string,
        documentType: string,
        password: string,
        email: string,
        status: string,
        firstName: string,
        secondName: string | null,
        firstSurname: string,
        secondSurname: string | null
    ) : Promise<User | null>;

    addPrivilege( user : User, name : string ) : Promise<Privilege[]>;

}