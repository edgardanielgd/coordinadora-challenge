import request from 'supertest';
import { Application } from 'express';
import { createTestApp } from '../../setup/app';
import { ILoginUseCase } from '../../../src/application/use_cases/auth/ILoginUseCase';
import { User } from '../../../src/domain/entities/User';
import { faker } from '@faker-js/faker';
import { IRegisterUseCase } from '../../../src/application/use_cases/user/IRegisterUseCase';
import { AuthController } from '../../../src/interfaces/controllers/authController';
import { UserController } from '../../../src/interfaces/controllers/userController';
import Server from '../../../src/frameworks/webserver/server';

describe(
  "Test Auth Controller", () => {
    let server : Server;
    let app : Application;

    const currentUser = new User(
        1, faker.internet.username(), faker.string.numeric(),
        'CC', faker.string.alphanumeric(), faker.internet.email(),
        'ACTIVE', faker.person.firstName(), null, faker.person.lastName(),
        null
      )

    const mockLoginUseCase : jest.Mocked<ILoginUseCase> = {
      execute: jest.fn()
    };

    const mockRegisterUserUseCase : jest.Mocked<IRegisterUseCase>= {
      execute: jest.fn()
    }

    const authController = new AuthController( mockLoginUseCase );
    const userController = new UserController( mockRegisterUserUseCase );

    mockLoginUseCase.execute.mockResolvedValue({
      'user': currentUser,
      'token': 'abc123'
    })

    beforeAll( () => {
      const { server : _server, app : _app } = createTestApp({
        authController: authController,
        userController: userController
      });

      server = _server;
      app = _app;
    })

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Should Login Successfully', async () => {

      const res = await request(app)
        .post('/api/v1/auth')
        .send({
          'usernameOrEmail': 'edgardanielgd1234@gmail.com',
          'password': 'paSs4w0rD:D'
        });

      expect(res.status).toBe(200);
      expect(res.body.loginResponse.token).toBe('abc123');
    })

    it('Should Match User Data', async () => {

      const res = await request(app)
        .post('/api/v1/auth')
        .send({
          'usernameOrEmail': 'testAccount@gmail.com',
          'password': 'paSs4w0rD:D'
        });

      expect(res.body.loginResponse.user.id).toBe(currentUser.getId());
      expect(res.body.loginResponse.user.username).toBe(currentUser.getUsername());
      expect(res.body.loginResponse.user.firstName).toBe(currentUser.getFirstName());
      expect(res.body.loginResponse.user.firstSurname).toBe(currentUser.getFirstSurname());
      expect(res.body.loginResponse.user.email).toBe(currentUser.getEmail());
      expect(res.body.loginResponse.user.documentType).toBe(currentUser.getDocumentType());
      expect(res.body.loginResponse.user.document).toBe(currentUser.getDocument());
    })
  }
)