import express from 'express';
import config from './config/config';
import Server from './frameworks/webserver/server';

const app = express();
const server = new Server(
    app, {
        ip : config.ip,
        port : config.port
    }
);

server.start();
