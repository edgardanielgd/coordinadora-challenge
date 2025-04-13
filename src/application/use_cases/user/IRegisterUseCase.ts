import { CreateUserDTO, CreateUserResponseDTO } from "../../dto/user";

export interface IRegisterUseCase {

  execute( createUserDto : CreateUserDTO ) : Promise<CreateUserResponseDTO>;

}