import { OrderController } from '../../../interfaces/controllers/orderController';
import { createOrderSchema, assignOrderSchema } from '../../joi/orderSchema';
import { validate } from '../middlewares/validate';
import { authenticate } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';
import { Router } from 'express';
import { AuthService } from '../../services/AuthService';

export const orderRouter = ( orderController : OrderController, authService : AuthService) => {
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
    validate(createOrderSchema),
    authorize(authService, ['USER']),
    orderController.create
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
    validate(assignOrderSchema),
    authorize(authService, ['ADMIN']),
    orderController.assign
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
  router.route('/:shortId').get(
    authenticate(authService),
    orderController.query,
  );

  return router;
}
