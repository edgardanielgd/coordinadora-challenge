import { IOrderRepository } from "../../repositories/IOrderRepository";
import { QueryOrderResponseDTO } from "../../dto/order";
import { IGetShipmentOrderStateUseCase } from "./IGetShipmentOrderStateUseCase";

export class GetShipmentOrderStateUseCase implements IGetShipmentOrderStateUseCase {

  private orderRepository : IOrderRepository;

  constructor (
    orderRepository : IOrderRepository,
  ) {
    this.orderRepository = orderRepository;
  }

  public async execute( orderShortId : string ) : Promise<QueryOrderResponseDTO> {

    const order = await this.orderRepository.findByShortId( orderShortId );

    if ( !order ) {
      throw new Error('Order not found');
    }

    return <QueryOrderResponseDTO>{ order };
  }

}