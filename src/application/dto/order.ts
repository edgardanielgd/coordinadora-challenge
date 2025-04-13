import { Order } from "../../domain/entities/Order";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateOrderDto:
 *       type: object
 *       required:
 *         - senderId
 *         - receiverId
 *         - productCategory
 *         - weightGrams
 *         - targetAddress
 *         - productDescription
 *         - dimensionX
 *         - dimensionY
 *         - dimensionZ
 *         - quantity
 *         - sourceCityId
 *         - targetCityId
 *       properties:
 *         senderId:
 *           type: integer
 *           description: The ID of the sender.
 *         receiverId:
 *           type: integer
 *           description: The ID of the receiver.
 *         productCategory:
 *           type: string
 *           description: The product category.
 *         weightGrams:
 *           type: string
 *           description: The weight of the product in grams.
 *         targetAddress:
 *           type: string
 *           description: The target address for the delivery.
 *         productDescription:
 *           type: string
 *           description: A brief description of the product.
 *         dimensionX:
 *           type: number
 *           format: float
 *           description: The dimension of the product along the X-axis.
 *         dimensionY:
 *           type: number
 *           format: float
 *           description: The dimension of the product along the Y-axis.
 *         dimensionZ:
 *           type: number
 *           format: float
 *           description: The dimension of the product along the Z-axis.
 *         quantity:
 *           type: integer
 *           description: The quantity of the product.
 *         sourceCityId:
 *           type: integer
 *           description: The ID of the source city.
 *         targetCityId:
 *           type: integer
 *           description: The ID of the target city.
 *       description: DTO for creating an order without optional or ID fields.
 */
export interface CreateOrderDTO {
    senderId: number;
    receiverId: number;
    productCategory: string;
    weightGrams: number;
    targetAddress: string;
    productDescription: string;
    dimensionX: number;
    dimensionY: number;
    dimensionZ: number;
    quantity: number;
    sourceCityId: number;
    targetCityId: number;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateOrderResponseDto:
 *       type: object
 *       required:
 *         - order
 *       properties:
 *         order:
 *           $ref: '#/components/schemas/Order'
 *       description: DTO for the response of creating an order. Contains the created order.
 */
export interface CreateOrderResponseDTO {
    order: Order;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     AssignOrderDTO:
 *       type: object
 *       required:
 *         - orderShortId
 *         - transporterId
 *         - routeId
 *         - expectedReachData
 *         - vehicleId
 *       properties:
 *         orderShortId:
 *           type: string
 *           description: A short identifier for the order.
 *         transporterId:
 *           type: integer
 *           format: int64
 *           description: ID of the transporter assigned to the order.
 *         routeId:
 *           type: integer
 *           format: int64
 *           description: ID of the route the order will follow.
 *         expectedReachData:
 *           type: string
 *           format: date-time
 *           description: Expected date and time the order should reach its destination.
 *         vehicleId:
 *           type: integer
 *           format: int64
 *           description: ID of the vehicle assigned for the order.
 *       description: DTO for updating an existing order with transport, route, and vehicle info.
 */

export interface AssignOrderDTO {
    orderShortId: string;
    transporterId: number;
    routeId: number;
    expectedReachData: Date;
    vehicleId: number;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     AssignOrderResponseDto:
 *       type: object
 *       required:
 *         - order
 *       properties:
 *         order:
 *           $ref: '#/components/schemas/Order'
 *       description: DTO for the response of assigning an order to a transporter. Contains the created order.
 */
export interface AssignOrderResponseDTO {
    order: Order;
}