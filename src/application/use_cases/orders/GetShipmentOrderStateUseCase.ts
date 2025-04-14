import { IOrderRepository } from "../../repositories/IOrderRepository";
import { QueryOrderResponseDTO } from "../../dto/order";
import { IGetShipmentOrderStateUseCase } from "./IGetShipmentOrderStateUseCase";
import { AuthPayload } from "../../services/IAuthService";
import { OrderNotFoundError } from "../../errors/orderErrors";

export class GetShipmentOrderStateUseCase implements IGetShipmentOrderStateUseCase {

  private orderRepository : IOrderRepository;

  constructor (
    orderRepository : IOrderRepository,
  ) {
    this.orderRepository = orderRepository;
  }

  public async execute( orderShortId : string, executorData : AuthPayload ) : Promise<QueryOrderResponseDTO> {

    const order = await this.orderRepository.findByShortId( orderShortId );

    if ( !order ) {
      throw new OrderNotFoundError('Order not found');
    }

    // Check user should see order
    const canSeeOrder = ('ADMIN' in executorData.roles) ||
      (executorData.user.getId() == order.getSenderId()) ||
      (executorData.user.getId() == order.getReceiverId());

    if ( !canSeeOrder ) {
      throw new OrderNotFoundError('Order not found');
    }

    return <QueryOrderResponseDTO>{ order };
  }

}