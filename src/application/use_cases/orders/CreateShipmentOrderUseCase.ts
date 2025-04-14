import { ICreateShipmentOrderUseCase } from "./ICreateShipmentOrderUseCase";
import { IOrderRepository } from "../../repositories/IOrderRepository";
import { IGeocodeService } from "../../services/IGeocodeService";
import { IMailService } from "../../services/IMailService";
import { IShortIdService } from "../../services/IShortIdService";
import { CreateOrderDTO, CreateOrderResponseDTO } from "../../dto/order";
import { IUserRepository } from "../../repositories/IUserRepository";
import { OrderBadLocation, OrderSenderMatchesReceiver, UnableToProcessOrder } from "../../errors/orderErrors";
import { UserNotFoundError } from "../../errors/userErrors";
import { UnableToSendMail } from "../../errors/servicesErrors";

export class CreateShipmentOrderUseCase implements ICreateShipmentOrderUseCase {

  private orderRepository : IOrderRepository;
  private geocodeService : IGeocodeService;
  private mailService : IMailService;
  private shortIdService : IShortIdService;
  private userRepository: IUserRepository;

  constructor (
    orderRepository : IOrderRepository,
    geocodeService : IGeocodeService,
    mailService : IMailService,
    shortIdService : IShortIdService,
    userRepository: IUserRepository,
  ) {
    this.orderRepository = orderRepository;
    this.geocodeService = geocodeService;
    this.mailService = mailService;
    this.shortIdService = shortIdService;
    this.userRepository = userRepository;
  }

  public async execute( createOrderDto : CreateOrderDTO ) : Promise<CreateOrderResponseDTO> {
    const shortId = await this.shortIdService.generateShortId();

    if ( !shortId ) {
      throw new Error("Unable to generate short Id for shipping order");
    }

    const geocodeResult = await this.geocodeService.checkAddress( createOrderDto.targetAddress );

    if ( !geocodeResult ) {
      throw new OrderBadLocation();
    }

    const order = await this.orderRepository.save(
      createOrderDto.senderId, createOrderDto.receiverId, createOrderDto.productCategory,
      createOrderDto.weightGrams, createOrderDto.targetAddress, createOrderDto.productDescription,
      createOrderDto.dimensionX, createOrderDto.dimensionY, createOrderDto.dimensionZ,
      createOrderDto.quantity, 'EN ESPERA', createOrderDto.sourceCityId, createOrderDto.targetCityId,
      geocodeResult.latitude, geocodeResult.longitude, geocodeResult.solvedAddress,
      geocodeResult.solvedCity, shortId
    );

    if ( !order ) {
      throw new UnableToProcessOrder('Unable to process order to create');
    }

    const user = await this.userRepository.findById( order.getSenderId() );

    if ( !user ) {
      throw new UserNotFoundError("Couldn\'t retrieve sender user");
    }

    if ( order.getSenderId() == order.getReceiverId() ) {
      throw new OrderSenderMatchesReceiver('Sender is the same receiver');
    }

    const emailStatus = await this.mailService.mailTo(
      `Shipment Order Created`,
      `<p1>Order with Id <b>${order.getShortId()}</b></p1> is created. State: <b>${order.getStatus()}</b>`,
      `${user.getEmail()}`
    );

    if ( !emailStatus ) {
      throw new UnableToSendMail("Unable to send order data to user");
    }

    return <CreateOrderResponseDTO>{ order }
  }

}