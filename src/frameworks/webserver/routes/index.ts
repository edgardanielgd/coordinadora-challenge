import { authRouter } from './auth';
import { userRouter } from './user';
import { swaggerRouter } from './docs';
import { errorHandler } from './../middlewares/error';
import { Application, Router } from 'express';
import { AuthController } from '../../../interfaces/controllers/authController';
import { UserController } from '../../../interfaces/controllers/userController';

export const useRouter = (
    app : Application,
    authController : AuthController,
    userController : UserController
) => {

    const apiRouter = Router();
    apiRouter.use('/auth', authRouter( authController ));
    apiRouter.use('/user', userRouter( userController ));
    apiRouter.use('/docs', swaggerRouter());

    app.use( '/api/v1', apiRouter );
    app.use(errorHandler);
}