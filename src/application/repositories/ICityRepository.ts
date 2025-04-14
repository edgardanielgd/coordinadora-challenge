import { City } from "../../domain/entities/City";

export interface ICityRepository {

    findById( id : number ) : Promise<City | null>;

}