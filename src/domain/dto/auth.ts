import { User } from "../entities/User";

/**
 * @openapi
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - usernameOrEmail
 *         - password
 *       properties:
 *         usernameOrEmail:
 *           type: string
 *         password:
 *           type: string
 */
export interface LoginDTO {
    usernameOrEmail : string;
    password : string;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       required:
 *         - token
 *         - user
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 */
export interface LoginResponseDTO {
    token : string,
    user : User
}

/**
 * @openapi
 * components:
 *   schemas:
 *     LoginResponseTokenOnly:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 */
export interface LoginResponseTokenOnlyDTO {
    token : string
}