import { Pool } from 'mysql2/promise';
import { City } from '../../../domain/entities/City';
import { ITransporterRepository } from '../../../application/repositories/ITransporterRepository';
import { Transporter } from '../../../domain/entities/Transporter';

export class TransporterRepository implements ITransporterRepository {

    pool : Pool

    constructor(
        pool : Pool
    ) {
        this.pool = pool;
    }

    public static mapTransporterColumns(row: any): Transporter {
        return new Transporter(
          row.tra_id,
          row.usr_id,
          row.tra_status
        );
      }

      public async findById( id : number ) : Promise<Transporter | null> {
        const query = (
            `
                SELECT
                    tra_id, usr_id, tra_status
                FROM \`transporter\`
                WHERE
                    tra_id = ?
            `
        )

        const [rows] = await this.pool.query<any[]>(query, [ id ] );
        const cities = rows.map( TransporterRepository.mapTransporterColumns );

        if ( cities.length == 0 ) return null;

        return cities[0];
    }

}