import { Transporter } from "../../domain/entities/Transporter";
import { City } from "../../domain/entities/City";

/**
 * @openapi
 * components:
 *   schemas:
 *     StatisticsOrder:
 *       type: object
 *       properties:
 *         meanTime:
 *           type: number
 *         minTime:
 *           type: number
 *         maxTime:
 *           type: number
 *         count:
 *           type: number
 */
export interface StatisticsOrderDTO {
    meanTime : number, minTime : number,
    maxTime : number, count : number
}

/**
 * @openapi
 * components:
 *   schemas:
 *     StatisticsOrderByTransporter:
 *       type: object
 *       properties:
 *         transporter:
 *           $ref: '#/components/schemas/Transporter'
 *         statistics:
 *           $ref: '#/components/schemas/StatisticsOrder'
 */
export interface StatisticsOrderByTransporterDTO {
    transporter : Transporter,
    statistics : StatisticsOrderDTO,
}

/**
 * @openapi
 * components:
 *   schemas:
 *     StatisticsOrderByCity:
 *       type: object
 *       properties:
 *         city:
 *           $ref: '#/components/schemas/City'
 *         statistics:
 *           $ref: '#/components/schemas/StatisticsOrder'
 */
export interface StatisticsOrderByCityDTO {
    city : City,
    statistics : StatisticsOrderDTO,
}