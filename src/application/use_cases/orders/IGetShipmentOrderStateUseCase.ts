import { QueryOrderResponseDTO } from "../../dto/order";

export interface IGetShipmentOrderStateUseCase {

  execute( orderShortId : string ) : Promise<QueryOrderResponseDTO>;

}