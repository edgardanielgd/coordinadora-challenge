import { AuthPayload } from '../../../src/application/services/IAuthService';
import { User } from '../../../src/domain/entities/User';
import { AuthService } from '../../../src/frameworks/services/AuthService';

describe(
  "Test Token Encryption", () => {

    beforeAll( () => { jest.clearAllMocks(); })

    const authService = new AuthService({ jwtSecret: 'long-string-test-jwt-secret-key-'});

    it('Hash Should Match', async () => {

      const result = authService.compare(
        'testPassword', '$2a$10$BdkSC7rnETd1Nvtk7lSLa.3U.Rlj/ak5kshJTH4uPIutogflD7brS'
      )

      expect(result).toBe(true);
    })

    it('User Metadata is returned', async () => {

      const expectedResult = <AuthPayload><unknown>{
        "user": new User(
          1, "A", "B", "C", "",
          "E", "F", "G", "G", "H", "I",
        ),
        "roles": [
          "ABCDEFG"
        ]
      }

      const token = authService.generateToken( expectedResult );
      const result = authService.verifyToken( token );

      expect(result?.roles).toStrictEqual(expectedResult.roles);
      expect(result?.user.getUsername()).toBe(expectedResult.user.getUsername());
      expect(result?.user.getDocument()).toBe(expectedResult.user.getDocument());
      expect(result?.user.getDocumentType()).toBe(expectedResult.user.getDocumentType());
      expect(result?.user.getFirstName()).toBe(expectedResult.user.getFirstName());
      expect(result?.user.getFirstSurname()).toBe(expectedResult.user.getFirstSurname());
      expect(result?.user.getSecondName()).toBe(expectedResult.user.getSecondName());
      expect(result?.user.getSecondSurname()).toBe(expectedResult.user.getSecondSurname());
      expect(result?.user.getEmail()).toBe(expectedResult.user.getEmail());

    })
  }
)