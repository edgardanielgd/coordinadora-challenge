import { Pool } from 'mysql2/promise';
import { IVehicleRepository } from '../../../application/repositories/IVehicleRepository';
import { Vehicle } from '../../../domain/entities/Vehicle';

export class VehicleRepository implements IVehicleRepository {

    pool : Pool

    constructor(
        pool : Pool
    ) {
        this.pool = pool;
    }

    private static mapVehicleColumns(row: any): Vehicle {
        return new Vehicle(
          row.veh_id,
          row.veh_name,
          row.veh_capacity
        );
      }

      public async findById( id : number ) : Promise<Vehicle | null> {
        const query = (
            `
                SELECT
                    veh_id, veh_name, veh_capacity
                FROM \`vehicle\`
                WHERE
                    veh_id = ?
            `
        )

        const [rows] = await this.pool.query<any[]>(query, [ id ] );
        const vehicles = rows.map( VehicleRepository.mapVehicleColumns );

        if ( vehicles.length == 0 ) return null;

        return vehicles[0];
    }

    public async getVehicleReservedCapacity(id: number): Promise<number | null> {
        const query = (
            `
                SELECT
                    SUM(B.ord_weight_grams * B.ord_quantity) AS reserved_capacity
                FROM \`vehicle\` A

                INNER JOIN
                    \`order\` B
                ON
                    B.ord_vehicle_id = A.veh_id

                WHERE
                    A.veh_id = ? AND B.ord_status = 'EN TRANSPORTE'
            `
        )

        const [rows] = await this.pool.query<any[]>(query, [ id ] );

        console.log(rows)

        if ( rows.length == 0 ) return null;

        return rows[0][0];
    }

}