import { config } from './../../src/frameworks/config/config'
import express, { Application, Express } from 'express';
import Server from './../../src/frameworks/webserver/server';

// Repositories
import { getPool } from './../../src/frameworks/database/mysql/pool';
import { UserRepository } from '../../src/frameworks/database/mysql/repositories/UserRepository';

// Services
import { AuthService } from '../../src/frameworks/services/AuthService';

// Use Cases
import { RegisterUserUseCase } from '../../src/application/use_cases/user/RegisterUseCase';
import { LoginUseCase } from '../../src/application/use_cases/auth/LoginUseCase';

// Controllers
import { AuthController } from './../../src/interfaces/controllers/authController';
import { UserController } from './../../src/interfaces/controllers/userController';
import { ILoginUseCase } from '../../src/application/use_cases/auth/ILoginUseCase';

export const createTestApp = (
  {
    authController,
    userController
  }: {
    authController: AuthController;
    userController: UserController;
  }
) => {

    const app = express();
    const server = new Server( app , {
        ip: config.ip, port: config.port, env : config.env,
        authController, userController
    });

    server.configServer()

    return { server, app };
};
