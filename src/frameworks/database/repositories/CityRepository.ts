import { Pool } from 'mysql2/promise';
import { ICityRepository } from '../../../application/repositories/ICityRepository';
import { City } from '../../../domain/entities/City';

export class CityRepository implements ICityRepository {

    pool : Pool

    constructor(
        pool : Pool
    ) {
        this.pool = pool;
    }

    public static mapCityColumns(row: any): City {
        return new City(
          row.cit_id,
          row.cit_name,
        );
      }

    public async findById( id : number ) : Promise<City | null> {
        const query = (
            `
                SELECT
                    cit_id, cit_name
                FROM \`city\`
                WHERE
                    ord_id = ?
            `
        )

        const [rows] = await this.pool.query<any[]>(query, [ id ] );
        const cities = rows.map( CityRepository.mapCityColumns );

        if ( cities.length == 0 ) return null;

        return cities[0];
    }

}