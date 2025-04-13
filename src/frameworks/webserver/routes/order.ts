import { OrderController } from '../../../interfaces/controllers/orderController';
import { createOrderSchema, assignOrderSchema } from '../../joi/orderSchema';
import { validate } from '../middlewares/validate';
import { Router } from 'express';

export const orderRouter = ( orderController : OrderController) => {
  const router = Router();

  /**
   * @openapi
   * /order:
   *   post:
   *     summary: Create a new shipment order
   *     tags:
   *       - Order
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateOrder'
   *     responses:
   *       201:
   *         description: Order created successfully
   *       400:
   *          description: Invalid data passed
  */
  router.route('/').post(
    validate(createOrderSchema), orderController.create
  );

  /**
   * @openapi
   * /order/{shortId}/assign:
   *   post:
   *     summary: Assign a new shipment order
   *     tags:
   *       - Order
   *     parameters:
   *        - in: path
   *          name: shortId
   *          required: true
   *          schema:
   *            type: string
   *          description: Short ID of order to assign
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AssignOrder'
   *     responses:
   *       200:
   *         description: Order assigned successfully
   *       400:
   *          description: Invalid data passed
  */
  router.route('/:shortId/assign').post(
    validate(assignOrderSchema), orderController.assign
  );

  /**
   * @openapi
   * /order/{shortId}:
   *   get:
   *     summary: Get shipment order state
   *     tags:
   *       - Order
   *     parameters:
   *        - in: path
   *          name: shortId
   *          required: true
   *          schema:
   *            type: string
   *          description: Short ID of order to assign
   *     responses:
   *       200:
   *         description: Order assigned successfully
   *       400:
   *          description: Invalid data passed
  */
  router.route('/:shortId').get( orderController.query );

  return router;
}
