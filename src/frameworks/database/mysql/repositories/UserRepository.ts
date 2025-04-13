import { Privilege } from "../../../../domain/entities/Privilege";
import { User } from "../../../../domain/entities/User";
import { IUserRepository } from "../../../../application/repositories/IUserRepository";
import { Pool } from 'mysql2/promise';

export class UserRepository implements IUserRepository {

    pool : Pool

    constructor(
        pool : Pool
    ) {
        this.pool = pool;
    }

    private static mapUserColumns ( row : any ) : User {
        return new User(
            row.usr_id,
            row.usr_username,
            row.usr_document,
            row.usr_document_type,
            row.usr_password,
            row.usr_email,
            row.usr_status,
            row.usr_first_name,
            row.usr_second_name,
            row.usr_first_surname,
            row.usr_second_surname
          );
    }

    private static mapPrivColumns ( row : any ) : Privilege {
        return new Privilege(
            row.prv_id,
            row.usr_id,
            row.prv_role,
          );
    }

    public async findById( id : number ) : Promise<User | null> {
        const query = (
            `
                SELECT
                    usr_id, usr_username, usr_document, usr_document_type, usr_password,
                    usr_email, usr_status, usr_first_name, usr_second_name,
                    usr_first_surname, usr_second_surname
                FROM
                    user
                WHERE
                    usr_id = ?
            `
        )

        const [rows] = await this.pool.query<any[]>(query, [ id ] );
        const users = rows.map( UserRepository.mapUserColumns );

        if ( users.length == 0 ) return null;

        return users[0];
    }

    public async checkUserExistence(
        document : string, documentType : string,
        username : string, email : string
    ) : Promise<boolean> {
        const query = (
            `
                SELECT
                    usr_id, usr_username, usr_document, usr_document_type, usr_password,
                    usr_email, usr_status, usr_first_name, usr_second_name,
                    usr_first_surname, usr_second_surname
                FROM
                    user
                WHERE
                    (usr_document = ? AND usr_document_type = ?) OR
                        (usr_username = ?) OR (usr_email = ?)
            `
        )

        const [rows] = await this.pool.query<any[]>(query, [
            document, documentType, username, email
         ] );
        const users = rows.map( UserRepository.mapUserColumns );

        if ( users.length > 0 ) return true;

        return false;
    }

    public async findByDocument( document : string, documentType : string ) : Promise<User | null> {
        const query = (
            `
                SELECT
                    usr_id, usr_username, usr_document, usr_document_type, usr_password,
                    usr_email, usr_status, usr_first_name, usr_second_name,
                    usr_first_surname, usr_second_surname
                FROM
                    user
                WHERE
                    usr_document = ? AND usr_document_type = ?
            `
        )

        const [rows] = await this.pool.query<any[]>(query, [ document, documentType ] );
        const users = rows.map( UserRepository.mapUserColumns );

        if ( users.length == 0 ) return null;

        return users[0];
    }

    public async findByUsernameOrEmail( usernameOrEmail : string ) : Promise<User | null> {
        const query = (
            `
                SELECT
                    usr_id, usr_username, usr_document, usr_document_type, usr_password,
                    usr_email, usr_status, usr_first_name, usr_second_name,
                    usr_first_surname, usr_second_surname
                FROM
                    user
                WHERE
                    usr_email = ? OR usr_username = ?
            `
        )

        const [rows] = await this.pool.query<any[]>(query, [ usernameOrEmail, usernameOrEmail ] );
        const users = rows.map( UserRepository.mapUserColumns );

        if ( users.length == 0 ) return null;

        return users[0];
    }

    public async findByUsername( username : string ) : Promise<User | null> {
        const query = (
            `
                SELECT
                    usr_id, usr_username, usr_document, usr_document_type, usr_password,
                    usr_email, usr_status, usr_first_name, usr_second_name,
                    usr_first_surname, usr_second_surname
                FROM
                    user
                WHERE
                    usr_username = ?
            `
        )

        const [rows] = await this.pool.query<any[]>(query, [ username ] );
        const users = rows.map( UserRepository.mapUserColumns );

        if ( users.length == 0 ) return null;

        return users[0];
    }

    public async findByEmail( email : string ) : Promise<User | null> {
        const query = (
            `
                SELECT
                    usr_id, usr_username, usr_document, usr_document_type, usr_password,
                    usr_email, usr_status, usr_first_name, usr_second_name,
                    usr_first_surname, usr_second_surname
                FROM
                    user
                WHERE
                    usr_email = ?
            `
        )

        const [rows] = await this.pool.query<any[]>(query, [ email ] );
        const users = rows.map( UserRepository.mapUserColumns );

        if ( users.length == 0 ) return null;

        return users[0];
    }

    public async getUserRoles( user : User ) : Promise<Privilege[]> {
        const query = (
            `
                SELECT
                    prv_id, prv_role
                FROM
                    privilege
                WHERE
                    usr_id = ?
            `
        )

        const [rows] = await this.pool.query<any[]>(query, [ user.getId() ] );
        const privileges = rows.map( UserRepository.mapPrivColumns );

        return privileges;
    }

    public async save(
        username: string,
        document: string,
        documentType: string,
        password: string,
        email: string,
        status: string,
        firstName: string,
        secondName: string | null,
        firstSurname: string,
        secondSurname: string | null,
    ) : Promise<User | null> {

        const query = (
            `
                INSERT INTO user (
                    usr_username, usr_document, usr_document_type, usr_password,
                    usr_email, usr_status, usr_first_name, usr_second_name,
                    usr_first_surname, usr_second_surname
                )
                    VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `
        )

        const [result] = await this.pool.execute(query, [
            username, document, documentType, password,
            email, status, firstName, secondName, firstSurname, secondSurname,
        ]);

        const insertId = (result as any).insertId;

        return this.findById( insertId );
    }

    public async addPrivilege( user : User, name : string ) : Promise<Privilege[]> {
        const query = (
            `
                INSERT INTO privilege (
                    usr_id, prv_role
                )
                    VALUES
                    (?, ?)
            `
        )

        const [result] = await this.pool.execute(query, [
            user.getId(), name
        ]);

        return this.getUserRoles( user );
    }

}