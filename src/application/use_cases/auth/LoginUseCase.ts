import { IUserRepository } from "../../repositories/IUserRepository";
import { IAuthService } from "../../services/IAuthService";
import { InvalidCredentialsError } from "../../errors/authErrors";
import { UserNotFoundError } from "../../errors/userErrors";
import { LoginDTO, LoginResponseDTO } from "../../dto/auth";
import { ILoginUseCase } from "./ILoginUseCase";

export class LoginUseCase implements ILoginUseCase {

  private userRepository : IUserRepository;
  private authService : IAuthService;

  constructor (
    userRepository : IUserRepository,
    authService : IAuthService
  ) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  public async execute( loginDTO : LoginDTO ) : Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByUsernameOrEmail( loginDTO.usernameOrEmail );

    if ( !user ) {
      throw new UserNotFoundError();
    }

    const hashedPassword = user.getPassword();

    const isValid = this.authService.compare(
      loginDTO.password, hashedPassword
    );

    if ( !isValid ) {
      throw new InvalidCredentialsError();
    }

    const roles = (
      await this.userRepository.getUserRoles( user )
    ).map( (role) => role.getName() );

    const token = this.authService.generateToken({
      user, roles
    });

    return <LoginResponseDTO>{
      user,
      token
    }
  }

}