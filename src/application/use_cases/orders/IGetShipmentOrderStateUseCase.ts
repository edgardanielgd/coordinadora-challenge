import { QueryOrderResponseDTO } from "../../dto/order";
import { AuthPayload } from "../../services/IAuthService";

export interface IGetShipmentOrderStateUseCase {

  execute( orderShortId : string, executorData : AuthPayload ) : Promise<QueryOrderResponseDTO>;

}