import { LoginResponseTokenOnlyDTO } from '../../dto/auth';
import { InvalidUserError, UserAlreadyExitsError } from '../../errors/userErrors';
import { CreateUserDTO, CreateUserResponseDTO } from '../../dto/user';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IAuthService } from '../../services/IAuthService';
import { IRegisterUseCase } from './IRegisterUseCase';

export class RegisterUserUseCase implements IRegisterUseCase {

  private userRepository : IUserRepository;
  private authService : IAuthService;

  constructor (
    userRepository : IUserRepository,
    authService : IAuthService
  ) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  public async execute( createUserDto : CreateUserDTO ) : Promise<CreateUserResponseDTO> {
    const existentUser = await this.userRepository.checkUserExistence(
        createUserDto.document, createUserDto.documentType,
        createUserDto.username, createUserDto.email
    )

    if ( existentUser ) {
        throw new UserAlreadyExitsError();
    }

    const hashedPassword = this.authService.hash( createUserDto.password );

    const user = await this.userRepository.save(
        createUserDto.username,
        createUserDto.document,
        createUserDto.documentType,
        hashedPassword,
        createUserDto.email,
        createUserDto.status,
        createUserDto.firstName,
        createUserDto.secondName,
        createUserDto.firstSurname,
        createUserDto.secondSurname
    );

    if ( !user ) {
        throw new InvalidUserError();
    }

    await Promise.all(createUserDto.roles.map(
        async (name) => this.userRepository.addPrivilege( user, name )
    ));

    const token = this.authService.generateToken({
        user: user,
        roles: createUserDto.roles
    });

    return <CreateUserResponseDTO>{
        user,
        auth : <LoginResponseTokenOnlyDTO>{
            token
        }
    }
  }

}