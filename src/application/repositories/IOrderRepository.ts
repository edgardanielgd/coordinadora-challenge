import { Order } from "../../domain/entities/Order";

export interface IOrderRepository {

    findById( id : number ) : Promise<Order | null>;
    findByShortId( shortId : string ) : Promise<Order | null>;

    update(
        order : Order
    ) : Promise<Order | null>;

    save(
        senderId: number,
        receiverId: number,
        productCategory: string,
        weightGrams: number,
        targetAddress: string,
        productDescription: string,
        dimensionX: number,
        dimensionY: number,
        dimensionZ: number,
        quantity: number,
        status: string,
        sourceCityId: number,
        targetCityId: number,
        latitude: number,
        longitude: number,
        solvedAddress: string,
        solvedCity: string,
        shortId: string,

    ) : Promise<Order | null>;

}