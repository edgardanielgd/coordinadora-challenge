import { LoginDTO, LoginResponseDTO } from "../../dto/auth";

export interface ILoginUseCase {

  execute( loginDTO : LoginDTO ) : Promise<LoginResponseDTO>;

}