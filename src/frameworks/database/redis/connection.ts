import Redis from 'ioredis';

export interface RedisConfig {
    host: string,
    port: number,
};

export const getRedis = (config : RedisConfig) => {
    return new Redis({
        host: config.host,
        port: config.port,
    });
}