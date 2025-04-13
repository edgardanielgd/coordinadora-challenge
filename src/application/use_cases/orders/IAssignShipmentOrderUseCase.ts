import { AssignOrderDTO, AssignOrderResponseDTO } from "../../dto/order";

export interface IAssignShipmentOrderUseCase {

  execute( assignOrderDTO : AssignOrderDTO ) : Promise<AssignOrderResponseDTO>;

}