import { User } from "../../domain/entities/User";
import { CreateUserDTO } from "../dto/user";
export interface IUserService {

    addUser( userDto : CreateUserDTO ) : Promise<User>;

}