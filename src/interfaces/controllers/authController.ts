import { Request, Response, NextFunction } from 'express';
import { LoginDTO } from '../../application/dto/auth';
import { UserNotFoundError } from '../../application/errors/userErrors';
import { InvalidCredentialsError } from '../../application/errors/authErrors';
import { ILoginUseCase } from '../../application/use_cases/auth/ILoginUseCase';

export class AuthController {

  private loginUseCase : ILoginUseCase;

  constructor(
    loginUseCase : ILoginUseCase
  ) {
    this.loginUseCase = loginUseCase;
  }

  public auth = async (req : Request, res : Response, next : NextFunction) : Promise<any> => {
      try {
        const loginDTO : LoginDTO = {
          usernameOrEmail : req.body.usernameOrEmail,
          password : req.body.password
        };

        const loginResponse = await this.loginUseCase.execute( loginDTO );

        return res.status(200).json(loginResponse);
      }
      catch ( error ) {
        if (error instanceof UserNotFoundError) {
          return res.status(404).json({ message : error.message })
        }

        if (error instanceof InvalidCredentialsError) {
          return res.status(401).json({ message : error.message })
        }

        next(error)
      }
    }
}