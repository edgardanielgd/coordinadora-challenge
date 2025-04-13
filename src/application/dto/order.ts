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
    weightGrams: string;
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