import { authRouter } from './auth';
import { userRouter } from './user';
import { orderRouter } from './order';
import { swaggerRouter } from './docs';
import { errorHandler } from './../middlewares/error';
import { Application, Router } from 'express';
import { AuthController } from '../../../interfaces/controllers/authController';
import { UserController } from '../../../interfaces/controllers/userController';
import { OrderController } from '../../../interfaces/controllers/orderController';
import { AuthService } from '../../services/AuthService';

export const useRouter = (
    app : Application,
    authController : AuthController,
    userController : UserController,
    orderController : OrderController,
    authService : AuthService
) => {

    const apiRouter = Router();
    apiRouter.use('/auth', authRouter( authController ));
    apiRouter.use('/user', userRouter( userController ));
    apiRouter.use('/order', orderRouter( orderController, authService ));
    apiRouter.use('/docs', swaggerRouter());

    app.use( '/api/v1', apiRouter );
    app.use(errorHandler);
}