import { CreateOrderDTO, CreateOrderResponseDTO } from "../../dto/order";

export interface ICreateShipmentOrderUseCase {

  execute( createOrderDto : CreateOrderDTO ) : Promise<CreateOrderResponseDTO>;

}