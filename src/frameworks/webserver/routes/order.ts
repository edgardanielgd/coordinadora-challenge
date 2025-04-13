import { OrderController } from '../../../interfaces/controllers/orderController';
import { createOrderSchema } from '../../joi/orderSchema';
import { validate } from '../middlewares/validate';
import { Router } from 'express';

export const orderRouter = ( orderController : OrderController) => {
  const router = Router();

  router.route('/').post(
    validate(createOrderSchema), orderController.create
  );

  return router;
}
