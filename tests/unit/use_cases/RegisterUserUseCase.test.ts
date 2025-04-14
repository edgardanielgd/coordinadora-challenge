import { MockUserRepository } from '../../mocks/repositories/MockUserRepository';
import { AuthService } from '../../../src/frameworks/services/AuthService';
import { RegisterUserUseCase } from '../../../src/application/use_cases/user/RegisterUseCase';
import { CreateUserDTO } from '../../../src/application/dto/user';
import { UserAlreadyExitsError } from '../../../src/application/errors/userErrors';

describe(
  "Test Login Use Case", () => {

    let userRepository : MockUserRepository;
    let authService : AuthService;
    let registerUseCase : RegisterUserUseCase;

    beforeAll( () => { jest.clearAllMocks(); })

    beforeEach(() => {
      userRepository = new MockUserRepository();
      authService = new AuthService({ jwtSecret: 'testSecret'});
      registerUseCase = new RegisterUserUseCase( userRepository, authService );
    });

    it('Should Create User Successfully', async () => {

      const response = await registerUseCase.execute(
        <CreateUserDTO>{
            "username": "user5",
            "document": "1000833174",
            "documentType": "CC",
            "password": "Holita123",
            "email": "edgardanielgd123@gmail.com",
            "status": "ACTIVE",
            "firstName": "Edgar",
            "firstSurname": "Gonzalez",
            "roles": [
                "USER"
            ]
        }
      )

      expect(response.user.getDocument()).toBe('1000833174');
    })

    it('Should Throw User Duplicated Error', async () => {

        const response1 = await registerUseCase.execute(
          <CreateUserDTO>{
              "username": "user5",
              "document": "1000833174",
              "documentType": "CC",
              "password": "OlaDeMar",
              "email": "edgardanielgd123@gmail.com",
              "status": "ACTIVE",
              "firstName": "Edgar",
              "firstSurname": "Gonzalez",
              "roles": [
                  "USER"
              ]
          }
        )

        try{
            const response2 = await registerUseCase.execute(
                <CreateUserDTO>{
                    "username": "user5",
                    "document": "1000833175",
                    "documentType": "CC",
                    "password": "OlaDeMar",
                    "email": "edgardanielgd123@gmail.com",
                    "status": "ACTIVE",
                    "firstName": "Edgar",
                    "firstSurname": "Gonzalez",
                    "roles": [
                        "USER"
                    ]
                }
              )
        } catch (e) {
            expect(e).toBeInstanceOf(UserAlreadyExitsError)
        }

    })

  }
)