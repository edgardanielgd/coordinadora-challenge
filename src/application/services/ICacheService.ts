export interface ICacheService {

    getKey( prefix : string,  object : any ) : Promise<string>;
    set( key : string, object : any ) : Promise<boolean>;
    get<T>( key : string ) : Promise<T | null>;
    delete( key : string ) : Promise<boolean>;

}