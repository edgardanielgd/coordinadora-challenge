import express, { Application } from "express";
import cors, { CorsOptions } from "cors";

interface ServerConfig {
  port: number,
  ip: string
}

export default class Server {

  app : Application
  config : ServerConfig

  constructor(
    app: Application,
    config : ServerConfig
  ) {
    this.app = app;
    this.config = config;
    this.configServer();
  }

  public start() : void {
    this.app.listen(
      this.config.port, this.config.ip,
      () => {
        console.log(`Server running on http://${this.config.ip}:${this.config.port}`)
      }
    )
  }

  private configServer(): void {
    const corsOptions: CorsOptions = {
      origin: "*"
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

}