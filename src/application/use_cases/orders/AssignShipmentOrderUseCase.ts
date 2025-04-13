import { IOrderRepository } from "../../repositories/IOrderRepository";
import { IMailService } from "../../services/IMailService";
import { AssignOrderDTO, AssignOrderResponseDTO } from "../../dto/order";
import { ITransporterRepository } from "../../repositories/ITransporterRepository";
import { IRouteRepository } from "../../repositories/IRouteRepository";
import { IVehicleRepository } from "../../repositories/IVehicleRepository";
import { ICityRepository } from "../../repositories/ICityRepository";
import { IAssignShipmentOrderUseCase } from "./IAssignShipmentOrderUseCase";

export class AssignShipmentOrderUseCase implements IAssignShipmentOrderUseCase {

  private orderRepository : IOrderRepository;
  private transportRepository : ITransporterRepository;
  private routeRepository : IRouteRepository;
  private vehicleRepository : IVehicleRepository;
  private cityRepository : ICityRepository;
  private mailService : IMailService;

  constructor (
    orderRepository : IOrderRepository,
    transportRepository : ITransporterRepository,
    routeRepository : IRouteRepository,
    vehicleRepository : IVehicleRepository,
    cityRepository : ICityRepository,
    mailService : IMailService,
  ) {
    this.orderRepository = orderRepository;
    this.transportRepository = transportRepository;
    this.routeRepository = routeRepository;
    this.vehicleRepository = vehicleRepository;
    this.cityRepository = cityRepository;
    this.mailService = mailService;
  }

  public async execute( assignOrderDTO : AssignOrderDTO ) : Promise<AssignOrderResponseDTO> {

    const order = await this.orderRepository.findByShortId( assignOrderDTO.orderShortId );

    if ( !order ) {
      throw new Error('Order not found');
    }

    // Check source and target cities are included in route
    const assignedRouteCities = await this.routeRepository.getRouteCities( assignOrderDTO.routeId );

    if ( !assignedRouteCities ) {
      throw new Error('Error getting route cities');
    }

    const citiesIds = assignedRouteCities.map( city => city.getId() );

    if ( !(order.getSourceCityId() in citiesIds) ) {
      throw new Error('Source City isn\'t included in route');
    }

    if ( !(order.getTargetCityId() in citiesIds) ) {
      throw new Error('Target City isn\'t included in route');
    }

    // Check vehicle has enough capacity to move packet
    const currentCapacity = await this.vehicleRepository.getVehicleReservedCapacity( assignOrderDTO.vehicleId );

    if ( ! currentCapacity ) {
      throw new Error('Couldn\'t get vehicle reserved capacity');
    }

    if ( currentCapacity + order.getWeightGrams() * order.getQuantity() ) {
      throw new Error('Can\'t move order due to vehicle capacity inssuficient')
    }

    order.setTransporterId( assignOrderDTO.transporterId );
    order.setRouteId( assignOrderDTO.routeId );
    order.setAssignedDate( new Date() );
    order.setExpectedReachDate( assignOrderDTO.expectedReachData );
    order.setStatus( 'EN TRANSPORTE' );

    const result = this.orderRepository.update( order );

    if ( !result ) {
      throw new Error('Couldn\'t update order');
    }

    const emailStatus = await this.mailService.mailTo(
      'Shipment changed it\' state', '<p1>Shipment has changed it\'s state to <b>IN TRANSPORT</b></p1>', 'edgardanielgd123@gmail.com'
    );

    if ( !emailStatus ) {
      throw new Error("Unable to send order data to user");
    }

    return <AssignOrderResponseDTO>{ order }
  }

}