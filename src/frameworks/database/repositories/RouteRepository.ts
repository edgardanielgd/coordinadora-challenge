import { Pool } from 'mysql2/promise';
import { City } from '../../../domain/entities/City';
import { IRouteRepository } from '../../../application/repositories/IRouteRepository';
import { Route } from '../../../domain/entities/Route';
import { CityRepository } from './CityRepository';

export class RouteRepository implements IRouteRepository {

    pool : Pool

    constructor(
        pool : Pool
    ) {
        this.pool = pool;
    }

    private static mapRouteColumns(row: any): Route {
        return new Route(
          row.rou_id,
          row.rou_name,
        );
      }

    public async findById( id : number ) : Promise<Route | null> {
        const query = (
            `
                SELECT
                    rou_id, rou_name
                FROM \`route\`
                WHERE
                    ord_id = ?
            `
        )

        const [rows] = await this.pool.query<any[]>(query, [ id ] );
        const cities = rows.map( RouteRepository.mapRouteColumns );

        if ( cities.length == 0 ) return null;

        return cities[0];
    }

    public async getRouteCities(id: number): Promise<City[] | null> {
        const query = (
            `
                SELECT
                    A.*
                FROM \`city\` A

                INNER JOIN
                    \`city_route\` B
                ON
                    B.cit_id = B.cit_id

                WHERE
                    B.rou_id = ?
            `
        )

        const [rows] = await this.pool.query<any[]>(query, [ id ] );
        const cities = rows.map( CityRepository.mapCityColumns );

        if ( cities.length == 0 ) return [];

        return cities;
    }

}