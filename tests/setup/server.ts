import express from 'express';

export const createTestServer = () => {
    const app = express();
    app.use(express.json());
    return app;
}