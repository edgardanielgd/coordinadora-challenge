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
   * /order/search/{shortId}:
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
  router.route('/search/:shortId').get(
    authenticate(authService),
    orderController.query,
  );

  /**
   * @openapi
   * /order/statistics:
   *   get:
   *     summary: Get shipment order statistics
   *     tags:
   *       - Order
   *     parameters:
   *       - in: query
   *         name: minOrderAssignedDate
   *         required: false
   *         schema:
   *           type: string
   *           format: date
   *         description: Min Order Assigned Date
   *       - in: query
   *         name: maxOrderAssignedDate
   *         required: false
   *         schema:
   *           type: string
   *           format: date
   *         description: Max Order Assigned Date
   *       - in: query
   *         name: status
   *         required: false
   *         schema:
   *           type: string
   *         description: Status to Filter
   *       - in: query
   *         name: groupBy
   *         required: false
   *         schema:
   *           type: string
   *         description: Field to group by
   *       - in: query
   *         name: limit
   *         required: false
   *         schema:
   *           type: integer
   *         description: Pagination max size
   *       - in: query
   *         name: page
   *         required: false
   *         schema:
   *           type: integer
   *         description: Pagination current page
   *       - in: query
   *         name: transporterId
   *         required: false
   *         schema:
   *           type: integer
   *         description: Transporter ID to filter
   *     responses:
   *       200:
   *         description: Statistics generated successfully
   *         content:
   *           application/json:
   *             schema:
   *                oneOf:
   *                  - $ref: '#/components/schemas/StatisticsOrder'
   *                  - $ref: '#/components/schemas/StatisticsOrderByTransporter'
   *                  - $ref: '#/components/schemas/StatisticsOrderByCity'
   *
   *       400:
   *         description: Invalid data passed
   */
  router.route('/statistics').get(
    authorize(authService, ['ADMIN']),
    orderController.statistics,
  );

  return router;
}
