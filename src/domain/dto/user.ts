import { User } from '../entities/User';
import { LoginResponseTokenOnlyDTO } from './auth';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - username
 *         - document
 *         - documentType
 *         - password
 *         - email
 *         - status
 *         - firstName
 *         - firstSurname
 *       properties:
 *         username:
 *           type: string
 *         document:
 *           type: string
 *         documentType:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         status:
 *           type: string
 *         firstName:
 *           type: string
 *         secondName:
 *           type: string
 *           nullable: true
 *         firstSurname:
 *           type: string
 *         secondSurname:
 *           type: string
 *           nullable: true
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *       description: The data transfer object used to create a new user
 */
export interface CreateUserDTO {
    username: string;
    document : string;
    documentType : string;
    password: string;
    email: string;
    status: string;
    firstName: string;
    secondName: string | undefined;
    firstSurname: string;
    secondSurname: string | undefined;
    roles : string[];
}

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserResponse:
 *       type: object
 *       required:
 *         - user
 *         - auth
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/User'
 *         auth:
 *           $ref: '#/components/schemas/LoginResponseTokenOnly'
 *
 *       description: Response of user creation process
 */
export interface CreateUserResponseDTO {
    user: User,
    auth: LoginResponseTokenOnlyDTO
}