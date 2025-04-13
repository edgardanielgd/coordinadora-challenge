import { Order } from "../../domain/entities/Order";

export interface IOrderRepository {

    findByShortId( shortId : string ) : Promise<Order | null>;

    save(
        senderId: number,
        receiverId: number,
        productCategory: string,
        weightGrams: string,
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

    ) : Promise<Order | null>,

}