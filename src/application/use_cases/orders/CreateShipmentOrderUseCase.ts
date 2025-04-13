import { ICreateShipmentOrderUseCase } from "./ICreateShipmentOrderUseCase";
import { IOrderRepository } from "../../repositories/IOrderRepository";
import { IGeocodeService } from "../../services/IGeocodeService";
import { IMailService } from "../../services/IMailService";
import { IShortIdService } from "../../services/IShortIdService";
import { CreateOrderDTO, CreateOrderResponseDTO } from "../../dto/order";

export class CreateShipmentOrderUseCase implements ICreateShipmentOrderUseCase {

  private orderRepository : IOrderRepository;
  private geocodeService : IGeocodeService;
  private mailService : IMailService;
  private shortIdService : IShortIdService;

  constructor (
    orderRepository : IOrderRepository,
    geocodeService : IGeocodeService,
    mailService : IMailService,
    shortIdService : IShortIdService,
  ) {
    this.orderRepository = orderRepository;
    this.geocodeService = geocodeService;
    this.mailService = mailService;
    this.shortIdService = shortIdService;
  }

  public async execute( createOrderDto : CreateOrderDTO ) : Promise<CreateOrderResponseDTO> {
    const shortId = await this.shortIdService.generateShortId();

    if ( !shortId ) {
      throw new Error("Unable to generate short Id for shipping order");
    }

    const geocodeResult = await this.geocodeService.checkAddress( createOrderDto.targetAddress );

    if ( !geocodeResult ) {
      throw new Error("Unable to check target address");
    }

    const order = await this.orderRepository.save(
      createOrderDto.senderId, createOrderDto.receiverId, createOrderDto.productCategory,
      createOrderDto.weightGrams, createOrderDto.targetAddress, createOrderDto.productDescription,
      createOrderDto.dimensionX, createOrderDto.dimensionY, createOrderDto.dimensionZ,
      createOrderDto.quantity, 'EN ESPERA', createOrderDto.sourceCityId, createOrderDto.targetCityId,
      geocodeResult.latitude, geocodeResult.longitude, geocodeResult.solvedAddress,
      geocodeResult.solvedCity, shortId
    );

    const emailStatus = await this.mailService.mailTo(
      'test', '<p1>This is an email to prove its worth it</p1>', 'edgardanielgd123@gmail.com'
    );

    if ( !emailStatus ) {
      throw new Error("Unable to send order data to user");
    }

    return <CreateOrderResponseDTO>{ order }
  }

}