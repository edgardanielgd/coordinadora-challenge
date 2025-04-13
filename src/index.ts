import { config } from './frameworks/config/config'

import express from 'express';
import Server from './frameworks/webserver/server';

// Repositories
import { getPool } from './frameworks/database/mysql/pool';
import { getRedis } from './frameworks/database/redis/connection';
import { UserRepository } from './frameworks/database/repositories/UserRepository';
import { OrderRepository } from './frameworks/database/repositories/OrderRepository';

// Services
import { AuthService } from './frameworks/services/AuthService';

// Use Cases
import { RegisterUserUseCase } from './application/use_cases/user/RegisterUseCase';
import { LoginUseCase } from './application/use_cases/auth/LoginUseCase';

// Controllers
import { AuthController } from './interfaces/controllers/authController';
import { UserController } from './interfaces/controllers/userController';
import { MailService } from './frameworks/services/MailService';
import { GeocodeService } from './frameworks/services/GeocodeService';
import { CreateShipmentOrderUseCase } from './application/use_cases/orders/CreateShipmentOrderUseCase';
import { ShortIdService } from './frameworks/services/ShortIdService';
import { OrderController } from './interfaces/controllers/orderController';
import { TransporterRepository } from './frameworks/database/repositories/TransporterRepository';
import { RouteRepository } from './frameworks/database/repositories/RouteRepository';
import { CityRepository } from './frameworks/database/repositories/CityRepository';
import { VehicleRepository } from './frameworks/database/repositories/VehicleRepository';
import { AssignShipmentOrderUseCase } from './application/use_cases/orders/AssignShipmentOrderUseCase';
import { GetShipmentOrderStateUseCase } from './application/use_cases/orders/GetShipmentOrderStateUseCase';

const pool = getPool({
    dbHost: config.dbHost,
    dbPort: config.dbPort,
    dbUser: config.dbUser,
    dbPassword: config.dbPassword,
    dbDatabase: config.dbDatabase,
})

const redis = getRedis({
    host: config.redisHost,
    port: config.redisPort
})

const userRepository = new UserRepository( pool );
const orderRepository = new OrderRepository( pool, redis );
const transporterRepository = new TransporterRepository( pool );
const routeRepository = new RouteRepository( pool );
const cityRepository = new CityRepository( pool );
const vehicleRepository = new VehicleRepository( pool );

const authService = new AuthService({ jwtSecret: config.jwtSecret });
const mailService = new MailService({
    host : config.smtpServer,
    port : config.smtpPort,
    user : config.smtpUsername,
    password : config.smtpPassword,
});
const geocodeService = new GeocodeService({
    apiUrl : config.geocodingApiUrl,
    apiKey : config.geocodingApiKey,
    minConfidenceLevel : 0.5
});
const shortIdService = new ShortIdService();

const registerUserUseCase = new RegisterUserUseCase(userRepository, authService);
const loginUseCase = new LoginUseCase(userRepository, authService);
const createOrderUseCase = new CreateShipmentOrderUseCase(
    orderRepository, geocodeService, mailService, shortIdService
);
const assignShipmentOrderUseCase = new AssignShipmentOrderUseCase(
    orderRepository,transporterRepository, routeRepository,
    vehicleRepository, cityRepository, mailService
);
const getShipmentStateOrderUseCase = new GetShipmentOrderStateUseCase(
    orderRepository
);


const authController = new AuthController(loginUseCase);
const userController = new UserController(registerUserUseCase);
const orderController = new OrderController(
    createOrderUseCase, assignShipmentOrderUseCase, getShipmentStateOrderUseCase
);

const app = express();
const server = new Server( app , {
    ip: config.ip, port: config.port, env : config.env,
    authController, userController, orderController
});

server.configServer()

server.start();