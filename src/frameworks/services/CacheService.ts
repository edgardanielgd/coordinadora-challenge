import Redis from "ioredis";
import { ICacheService } from "../../application/services/ICacheService";

export interface CacheServiceConfig {
    host: string, port: number
}

export class CacheService implements ICacheService {

    redis : Redis;

    constructor(
        redis : Redis
    ) {
        this.redis = redis;
    }

    public async getKey( prefix : string, object : any ) : Promise<string> {
        const parts = Object.entries(object)
            .filter(([, value]) => value !== undefined && value !== null)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => `${key}=${value}`);

        const key = `${prefix}?${parts.join('&')}`;

        return key;
    }

    public async set( key : string, object : any ) : Promise<boolean> {
        const serialized = JSON.stringify( object )
        const result = await this.redis.set( key, serialized );
        return !!result;
    }

    public async get<T>( key : string ) : Promise<T | null> {
        const result = await this.redis.get( key );

        if ( !result ) return null;

        const parsed = <T>(JSON.parse( result ));

        return parsed;
    }

    public async delete( key : string ) : Promise<boolean> {
        const result = await this.redis.del( key );

        return !!result;
    }

}