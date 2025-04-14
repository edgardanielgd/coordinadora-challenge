import { City } from "../../domain/entities/City";
import { Route } from "../../domain/entities/Route";

export interface IRouteRepository {

    findById( id : number ) : Promise<Route | null>;
    getRouteCities( id : number ): Promise<City[] | null>

}