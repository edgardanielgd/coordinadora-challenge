import { Pool } from 'mysql2/promise';
import { IOrderRepository } from "../../../application/repositories/IOrderRepository";
import { Order } from "../../../domain/entities/Order";
import Redis from 'ioredis';

export class OrderRepository implements IOrderRepository {

    pool : Pool
    redis : Redis

    constructor(
        pool : Pool,
        redis : Redis
    ) {
        this.pool = pool;
        this.redis = redis;
    }

    private static mapOrderColumns(row: any): Order {
        return new Order(
          row.ord_id,
          row.ord_sender_id,
          row.ord_receiver_id,
          row.ord_product_category,
          row.ord_weight_grams,
          row.ord_target_address,
          row.ord_product_description,
          row.ord_dimension_x,
          row.ord_dimension_y,
          row.ord_dimension_z,
          row.ord_quantity,
          row.ord_status,
          row.ord_transporter_id,
          row.ord_route_id,
          row.ord_source_city_id,
          row.ord_target_city_id,
          row.ord_latitude,
          row.ord_longitude,
          row.ord_solved_address,
          row.ord_solved_city,
          row.ord_assigned_date ? new Date(row.ord_assigned_date) : null,
          row.ord_expected_reach_date ? new Date(row.ord_expected_reach_date) : null,
          row.ord_actual_reach_date ? new Date(row.ord_actual_reach_date) : null,
          row.ord_short_id,
          row.ord_vehicle_id
        );
      }

      public async findById( id : number ) : Promise<Order | null> {

        const query = (
            `
                SELECT
                    ord_id, ord_sender_id, ord_receiver_id, ord_product_category, ord_weight_grams,
                    ord_target_address, ord_product_description, ord_dimension_x, ord_dimension_y, ord_dimension_z,
                    ord_quantity, ord_status, ord_transporter_id, ord_route_id, ord_source_city_id, ord_target_city_id,
                    ord_latitude, ord_longitude, ord_solved_address, ord_solved_city,
                    ord_assigned_date, ord_expected_reach_date, ord_actual_reach_date,
                    ord_short_id, ord_vehicle_id
                FROM \`order\`
                WHERE
                    ord_id = ?
            `
        )

        const [rows] = await this.pool.query<any[]>(query, [ id ] );
        const orders = rows.map( OrderRepository.mapOrderColumns );

        if ( orders.length == 0 ) return null;

        return orders[0];
    }

    public async update(
        order: Order
    ) : Promise<Order | null> {

        const query = (
            `
                UPDATE \`order\` SET
                    ord_sender_id = ?, ord_receiver_id = ?, ord_product_category = ?, ord_weight_grams = ?,
                    ord_target_address = ?, ord_product_description = ?, ord_dimension_x = ?, ord_dimension_y = ?, ord_dimension_z = ?,
                    ord_quantity = ?, ord_status = ?, ord_source_city_id = ?, ord_target_city_id = ?,
                    ord_latitude = ?, ord_longitude = ?, ord_solved_address = ?, ord_solved_city = ?, ord_short_id = ?
                WHERE ord_id = ?;
            `
        )

        await this.pool.execute(query, [
            order.getSenderId(), order.getReceiverId(), order.getProductCategory(), order.getWeightGrams(),
            order.getTargetAddress(), order.getProductDescription(), order.getDimensionX(), order.getDimensionY(), order.getDimensionZ(),
            order.getQuantity(), order.getStatus(), order.getSourceCityId(), order.getTargetCityId(),
            order.getLatitude(), order.getLongitude(), order.getSolvedAddress(), order.getSolvedCity(), order.getShortId(),
            order.getId(),
          ]);

        return this.findById( order.getId() );

    }

    public async findByShortId( shortId : string ) : Promise<Order | null> {

        const cachedKey = `order:${shortId}`;

        const cached = await this.redis.get( cachedKey );
        if (cached) {
            return <Order>JSON.parse( cached );
        }

        const query = (
            `
                SELECT
                    ord_id, ord_sender_id, ord_receiver_id, ord_product_category, ord_weight_grams,
                    ord_target_address, ord_product_description, ord_dimension_x, ord_dimension_y, ord_dimension_z,
                    ord_quantity, ord_status, ord_transporter_id, ord_route_id, ord_source_city_id, ord_target_city_id,
                    ord_latitude, ord_longitude, ord_solved_address, ord_solved_city,
                    ord_assigned_date, ord_expected_reach_date, ord_actual_reach_date,
                    ord_short_id, ord_vehicle_id
                FROM \`order\`
                WHERE
                    ord_short_id = ?
            `
        )

        const [rows] = await this.pool.query<any[]>(query, [ shortId ] );
        const orders = rows.map( OrderRepository.mapOrderColumns );

        if ( orders.length == 0 ) return null;

        const resolvedOrder = orders[0];

        if ( !cached ) {
            await this.redis.set(
                cachedKey, JSON.stringify(resolvedOrder), 'EX', 3600
            );
        }

        return orders[0];
    }

    public async save(
        senderId: number,
        receiverId: number,
        productCategory: string,
        weightGrams: number,
        targetAddress: string,
        productDescription: string,
        dimensionX: number,
        dimensionY: number,
        dimensionZ: number,
        quantity: number,
        status: string,
        sourceCityId: number,
        targetCityId: number,
        latitude: number,
        longitude: number,
        solvedAddress: string,
        solvedCity: string,
        shortId: string,
    ) : Promise<Order | null> {

        const query = (
            `
                INSERT INTO \`order\` (
                    ord_sender_id, ord_receiver_id, ord_product_category, ord_weight_grams,
                    ord_target_address, ord_product_description, ord_dimension_x, ord_dimension_y, ord_dimension_z,
                    ord_quantity, ord_status, ord_source_city_id, ord_target_city_id,
                    ord_latitude, ord_longitude, ord_solved_address, ord_solved_city, ord_short_id
                ) VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                );
            `
        )

        const [result] = await this.pool.execute(query, [
            senderId, receiverId, productCategory, weightGrams, targetAddress, productDescription,
            dimensionX, dimensionY, dimensionZ, quantity, status, sourceCityId, targetCityId,
            latitude, longitude, solvedAddress, solvedCity, shortId,
          ]);

        const insertId = (result as any).insertId;

        return this.findById( insertId );
    }

}