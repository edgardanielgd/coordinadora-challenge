import { LoginUseCase } from '../../../src/application/use_cases/auth/LoginUseCase';
import { MockUserRepository } from '../../mocks/repositories/MockUserRepository';
import { AuthService } from '../../../src/frameworks/services/AuthService';
import { LoginDTO } from '../../../src/application/dto/auth';
import { InvalidCredentialsError } from '../../../src/application/errors/authErrors';

describe(
  "Test Login Use Case", () => {

    beforeAll( () => { jest.clearAllMocks(); })

    let userRepository : MockUserRepository = new MockUserRepository();
    let authService : AuthService = new AuthService({ jwtSecret: 'testSecret'});
    let loginUseCase : LoginUseCase = new LoginUseCase( userRepository, authService );

    it('Should Login Successfully', async () => {

      const user = await userRepository.save(
        "A", "B", "C", "$2a$10$BdkSC7rnETd1Nvtk7lSLa.3U.Rlj/ak5kshJTH4uPIutogflD7brS",
        "E", "F", "G", "G", "H", "I",
      )

      const response = await loginUseCase.execute(
        <LoginDTO>{
          usernameOrEmail: 'A', password: 'testPassword'
        }
      )

      expect(response).toBeDefined();
      expect(response.user.getId()).toBe(user?.getId());

    })

    it('Should Login Fail', async () => {

      await userRepository.save(
        "A", "B", "C", "$2a$10$BdkSC7rnETd1Nvtk7lSLa.3U.Rlj/ak5kshJTH4uPIutogflD7brS",
        "E", "F", "G", "G", "H", "I",
      )

      try {
        await loginUseCase.execute(
          <LoginDTO>{
            usernameOrEmail: 'A', password: 'incorrectPassword'
          }
        )
      } catch(e) {
        expect(e).toBeInstanceOf(InvalidCredentialsError);
      }

    })
  }
)