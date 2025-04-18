import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

import { useRouter } from './routes';
import { AuthController } from "../../interfaces/controllers/authController";
import { UserController } from "../../interfaces/controllers/userController";
import { OrderController } from "../../interfaces/controllers/orderController";
import { AuthService } from "../services/AuthService";

interface ServerConfig {
  port: number,
  ip: string,
  env : string,
  authController : AuthController,
  userController : UserController,
  orderController : OrderController,
  authService : AuthService,
}

export default class Server {

  app : Application
  config : ServerConfig

  constructor(
    app: Application,
    config : ServerConfig,
  ) {
    this.app = app;
    this.config = config;
  }

  public start() : void {
    const server = this.app.listen(
      this.config.port, this.config.ip,
      () => {
        console.log(`Server running on http://${this.config.ip}:${this.config.port}`)
      }
    )
  }

  public configServer(): void {
    const corsOptions: CorsOptions = {
      origin: "*"
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan( this.config.env ));

    useRouter(
      this.app,
      this.config.authController,
      this.config.userController,
      this.config.orderController,
      this.config.authService
    );
  }

}