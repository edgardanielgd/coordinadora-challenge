import { Vehicle } from "../../domain/entities/Vehicle";

export interface IVehicleRepository {

    findById( id : number ) : Promise<Vehicle | null>;
    getVehicleReservedCapacity( id : number ) : Promise<number | null>;

}