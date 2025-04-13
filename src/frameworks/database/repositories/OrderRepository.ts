import { Pool } from 'mysql2/promise';
import { IOrderRepository } from "../../../application/repositories/IOrderRepository";
import { Order } from "../../../domain/entities/Order";
import { StatisticsOrderDTO, StatisticsOrderByCityDTO, StatisticsOrderByTransporterDTO } from '../../../application/dto/statistics';
import { TransporterRepository } from './TransporterRepository';
import { CityRepository } from './CityRepository';
import { ICacheService } from '../../../application/services/ICacheService';

export class OrderRepository implements IOrderRepository {

    pool : Pool
    cacheService : ICacheService;

    constructor(
        pool : Pool,
        cacheService : ICacheService
    ) {
        this.pool = pool;
        this.cacheService = cacheService;
    }

    public static mapOrderColumns(row: any): Order {
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

        const cachedKey = `order:${order.getShortId()}`;

        await this.cacheService.set( cachedKey, order );

        return this.findById( order.getId() );

    }

    public async findByShortId( shortId : string ) : Promise<Order | null> {

        const cachedKey = `order:${shortId}`;
        const cached = await this.cacheService.get<Order>( cachedKey );
        if (cached) { return cached; }

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
            await this.cacheService.set( cachedKey, resolvedOrder );
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

    private generateMetricsFilterClause(
        minShipmentDate? : Date,
        maxShipmentDate? : Date,
        shipmentStatus? : string,
        transporterId?: number
    ) : string {
        let whereClause = `TRUE \n`;

        if ( minShipmentDate ) {
            whereClause = `${whereClause} AND \`order\`.ord_assigned_date >= '${minShipmentDate.toISOString()}'`;
        }

        if ( maxShipmentDate ) {
            whereClause = `${whereClause} AND \`order\`.ord_assigned_date <= '${maxShipmentDate.toISOString()}'`;
        }

        if ( shipmentStatus ) {
            whereClause = `${whereClause} AND \`order\`.ord_status = '${shipmentStatus}'`;
        }

        if ( transporterId ) {
            whereClause = `${whereClause} AND transporter.tra_id = ${transporterId}`;
        }

        return whereClause;
    }

    public async getGeneralOrdersMetrics(
        minShipmentDate? : Date,
        maxShipmentDate? : Date,
        shipmentStatus? : string,
        transporterId?: number
    ) : Promise<StatisticsOrderDTO> {

        const key = await this.cacheService.getKey(
            'statistics-general',
            { minShipmentDate, maxShipmentDate, shipmentStatus, transporterId }
        );

        const redisResult = await this.cacheService.get<StatisticsOrderDTO>( key );

        if (redisResult) { return redisResult; }

        const whereClause = this.generateMetricsFilterClause(
            minShipmentDate, maxShipmentDate,
            shipmentStatus, transporterId
        );

        const query = (
            `
                SELECT
                    COUNT(*) AS count,
                    MIN(TIMESTAMPDIFF(DAY, ord_assigned_date, COALESCE(ord_actual_reach_date, CURRENT_TIMESTAMP))) AS minTime,
                    MAX(TIMESTAMPDIFF(DAY, ord_assigned_date, COALESCE(ord_actual_reach_date, CURRENT_TIMESTAMP))) AS maxTime,
                    AVG(TIMESTAMPDIFF(DAY, ord_assigned_date, COALESCE(ord_actual_reach_date, CURRENT_TIMESTAMP))) AS meanTime
                FROM \`order\`

                INNER JOIN transporter ON \`order\`.ord_transporter_id = transporter.tra_id
                INNER JOIN vehicle ON \`order\`.ord_vehicle_id = vehicle.veh_id

                WHERE ord_assigned_date IS NOT NULL
                AND
                    ${whereClause}
            `
        )

        const [rows] = await this.pool.query<any[]>(query);

        const { count, minTime, maxTime, meanTime } = rows[0];

        const sqlResult = <StatisticsOrderDTO>{
            minTime, maxTime, meanTime, count
        }

        if ( ! redisResult ) await this.cacheService.set( key, sqlResult );

        return sqlResult;
    }

    public async getGeneralOrdersMetricsByTransporter(
        limit : number, page : number,
        minShipmentDate? : Date,
        maxShipmentDate? : Date,
        shipmentStatus? : string,
        transporterId?: number
    ) : Promise<StatisticsOrderByTransporterDTO[]> {

        const key = await this.cacheService.getKey(
            'statistics-transporter',
            { limit, page, minShipmentDate, maxShipmentDate, shipmentStatus, transporterId }
        );

        const redisResult = await this.cacheService.get<StatisticsOrderByTransporterDTO[]>( key );

        if (redisResult) { return redisResult; }

        const whereClause = this.generateMetricsFilterClause(
            minShipmentDate, maxShipmentDate,
            shipmentStatus, transporterId
        );

        const query = (
            `
                SELECT
                    transporter.tra_id, transporter.usr_id, transporter.tra_status,
                    COUNT(*) AS count,
                    MIN(TIMESTAMPDIFF(DAY, ord_assigned_date, COALESCE(ord_actual_reach_date, CURRENT_TIMESTAMP))) AS minTime,
                    MAX(TIMESTAMPDIFF(DAY, ord_assigned_date, COALESCE(ord_actual_reach_date, CURRENT_TIMESTAMP))) AS maxTime,
                    AVG(TIMESTAMPDIFF(DAY, ord_assigned_date, COALESCE(ord_actual_reach_date, CURRENT_TIMESTAMP))) AS meanTime
                FROM \`order\`

                INNER JOIN transporter ON \`order\`.ord_transporter_id = transporter.tra_id

                WHERE ord_assigned_date IS NOT NULL
                AND
                    ${whereClause}

                GROUP BY
                    transporter.tra_id, transporter.usr_id, transporter.tra_status
                ORDER BY transporter.tra_id ASC
                LIMIT ${limit} OFFSET ${(page) * limit}
            `
        )

        const [rows] = await this.pool.query<any[]>(query);

        const sqlResult : StatisticsOrderByTransporterDTO[] = rows.map(
            row => {
                const transporter = TransporterRepository.mapTransporterColumns( row );

                const { count, minTime, maxTime, meanTime } = row;
                const statistics = <StatisticsOrderDTO>{
                    count : parseFloat( count ), minTime : parseFloat( minTime ),
                    maxTime : parseFloat( maxTime ), meanTime : parseFloat( meanTime )
                }

                return <StatisticsOrderByTransporterDTO>{
                    transporter,
                    statistics
                }
            }
        )

        if ( ! redisResult ) await this.cacheService.set( key, sqlResult );

        return sqlResult;
    }

    public async getGeneralOrdersMetricsByCity(
        limit : number, page : number,
        minShipmentDate? : Date,
        maxShipmentDate? : Date,
        shipmentStatus? : string,
        transporterId?: number
    ) : Promise<StatisticsOrderByCityDTO[]> {

        const key = await this.cacheService.getKey(
            'statistics-city',
            { limit, page, minShipmentDate, maxShipmentDate, shipmentStatus, transporterId }
        );

        const redisResult = await this.cacheService.get<StatisticsOrderByCityDTO[]>( key );

        if (redisResult) { return redisResult; }

        const whereClause = this.generateMetricsFilterClause(
            minShipmentDate, maxShipmentDate,
            shipmentStatus, transporterId
        );

        const query = (
            `
                SELECT
                    city.cit_id, city.cit_name,
                    COUNT(*) AS count,
                    MIN(TIMESTAMPDIFF(DAY, ord_assigned_date, COALESCE(ord_actual_reach_date, CURRENT_TIMESTAMP))) AS minTime,
                    MAX(TIMESTAMPDIFF(DAY, ord_assigned_date, COALESCE(ord_actual_reach_date, CURRENT_TIMESTAMP))) AS maxTime,
                    AVG(TIMESTAMPDIFF(DAY, ord_assigned_date, COALESCE(ord_actual_reach_date, CURRENT_TIMESTAMP))) AS meanTime
                FROM \`order\`

                INNER JOIN city ON \`order\`.ord_target_city_id = city.cit_id

                WHERE ord_assigned_date IS NOT NULL
                AND
                    ${whereClause}

                GROUP BY
                    city.cit_id, city.cit_name

                ORDER BY city.cit_id ASC
                LIMIT ${limit} OFFSET ${(page) * limit}
            `
        )

        const [rows] = await this.pool.query<any[]>(query);

        const sqlResult : StatisticsOrderByCityDTO[] = rows.map(
            row => {
                const city = CityRepository.mapCityColumns( row );

                const { count, minTime, maxTime, meanTime } = row;
                const statistics = <StatisticsOrderDTO>{
                    count : parseFloat( count ), minTime : parseFloat( minTime ),
                    maxTime : parseFloat( maxTime ), meanTime : parseFloat( meanTime )
                }

                return <StatisticsOrderByCityDTO>{
                    city,
                    statistics
                }
            }
        )

        if ( ! redisResult ) await this.cacheService.set( key, sqlResult );

        return sqlResult;
    }

}