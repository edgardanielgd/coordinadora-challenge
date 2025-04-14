import { Request, Response, NextFunction } from 'express';
import { InvalidUserError, UserAlreadyExitsError } from '../../application/errors/userErrors';
import { CreateUserDTO } from '../../application/dto/user';
import { IRegisterUseCase } from '../../application/use_cases/user/IRegisterUseCase';

export class UserController {

  private registerUserUseCase : IRegisterUseCase;

  constructor(
    registerUserUseCase : IRegisterUseCase,
  ) {
    this.registerUserUseCase = registerUserUseCase;
  }

  public register = async (req : Request, res : Response, next : NextFunction) : Promise<any> => {
      try {
        const createUserDTO : CreateUserDTO = {
          username : req.body.username,
          document : req.body.document,
          documentType : req.body.documentType,
          password : req.body.password,
          email : req.body.email,
          status : req.body.status,
          firstName : req.body.firstName,
          secondName : req.body.secondName || null,
          firstSurname : req.body.firstSurname,
          secondSurname : req.body.secondSurname || null,
          roles : req.body.roles,
        };

        const registerResponse = await this.registerUserUseCase.execute( createUserDTO );

        return res.status(201).json(registerResponse);
      }
      catch ( error ) {
        if (error instanceof UserAlreadyExitsError) {
          return res.status(409).json({ message : error.message })
        }

        if (error instanceof InvalidUserError) {
          return res.status(400).json({ message : error.message })
        }

        next(error)
      }
    }
}