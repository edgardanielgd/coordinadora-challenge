import { Transporter } from "nodemailer";
import { Order } from "../../domain/entities/Order";
import { City } from "../../domain/entities/City";
import { StatisticsOrderDTO, StatisticsOrderByCityDTO, StatisticsOrderByTransporterDTO } from "../dto/statistics";
export interface IOrderRepository {

    findById( id : number ) : Promise<Order | null>;
    findByShortId( shortId : string ) : Promise<Order | null>;

    update(
        order : Order
    ) : Promise<Order | null>;

    getGeneralOrdersMetrics(
        minShipmentDate? : Date,
        maxShipmentDate? : Date,
        shipmentStatus? : string,
        transporterId?: number
    ) : Promise<StatisticsOrderDTO>;

    getGeneralOrdersMetricsByTransporter(
        limit : number, page : number,
        minShipmentDate? : Date,
        maxShipmentDate? : Date,
        shipmentStatus? : string,
        transporterId?: number
    ) : Promise<StatisticsOrderByTransporterDTO[]>;

    getGeneralOrdersMetricsByCity(
        limit : number, page : number,
        minShipmentDate? : Date,
        maxShipmentDate? : Date,
        shipmentStatus? : string,
        transporterId?: number
    ) : Promise<StatisticsOrderByCityDTO[]>;

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