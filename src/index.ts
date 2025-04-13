import { config } from './frameworks/config/config'

import express from 'express';
import Server from './frameworks/webserver/server';

// Repositories
import { getPool } from './frameworks/database/mysql/pool';
import { UserRepositoryImpl } from './frameworks/database/mysql/repositories/UserRepository';

// Services
import { AuthService } from './frameworks/services/AuthService';

// Use Cases
import { RegisterUserUseCase } from './application/use_cases/user/RegisterUseCase';
import { LoginUseCase } from './application/use_cases/auth/LoginUseCase';

// Controllers
import { AuthController } from './interfaces/controllers/authController';
import { UserController } from './interfaces/controllers/userController';

const pool = getPool({
    dbHost: config.dbHost,
    dbPort: config.dbPort,
    dbUser: config.dbUser,
    dbPassword: config.dbPassword,
    dbDatabase: config.dbDatabase,
})

const userRepository = new UserRepositoryImpl( pool );

const authService = new AuthService({ jwtSecret: config.jwtSecret });

const registerUserUseCase = new RegisterUserUseCase(userRepository, authService);
const loginUseCase = new LoginUseCase(userRepository, authService);

const authController = new AuthController(loginUseCase);
const userController = new UserController(registerUserUseCase);

const app = express();
const server = new Server( app , {
    ip: config.ip, port: config.port, env : config.env,
    authController, userController
});

server.configServer()

server.start();