import { IOrderRepository } from "../../../src/application/repositories/IOrderRepository";
import { Order } from "../../../src/domain/entities/Order";
import { StatisticsOrderDTO, StatisticsOrderByCityDTO, StatisticsOrderByTransporterDTO } from "../../../src/application/dto/statistics";
import { ICacheService } from "../../../src/application/services/ICacheService";

export class MockOrderRepository implements IOrderRepository {
  public orders: Map<number, Order> = new Map();
  private shortIdToOrder: Map<string, Order> = new Map();
  private currentId: number = 1;

  public async findById(id: number): Promise<Order | null> {
    return this.orders.get(id) || null;
  }

  public async findByShortId(shortId: string): Promise<Order | null> {
    return this.shortIdToOrder.get(shortId) || null;
  }

  public async update(order: Order): Promise<Order | null> {
    if (this.orders.has(order.getId())) {
      console.log('tiene')
      this.orders.set(order.getId(), order);
      return order;
    }
    return null;
  }

  public async save(
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
    shortId: string
  ): Promise<Order | null> {
    const id = this.currentId++;
    const newOrder = new Order(
      id,
      senderId, receiverId, productCategory, weightGrams,
      targetAddress, productDescription, dimensionX, dimensionY, dimensionZ,
      quantity, status, null, null, sourceCityId, targetCityId,
      latitude, longitude, solvedAddress, solvedCity, null, null, null, shortId, null
    );
    this.orders.set(id, newOrder);
    this.shortIdToOrder.set(shortId, newOrder);
    return newOrder;
  }

  public async getGeneralOrdersMetrics(
    minShipmentDate?: Date,
    maxShipmentDate?: Date,
    shipmentStatus?: string,
    transporterId?: number
  ): Promise<StatisticsOrderDTO> {
    // This method could be implemented by processing the in-memory `orders` array.
    return {
      minTime: 0,
      maxTime: 0,
      meanTime: 0,
      count: this.orders.size
    };
  }

  public async getGeneralOrdersMetricsByTransporter(
    limit: number, page: number,
    minShipmentDate?: Date,
    maxShipmentDate?: Date,
    shipmentStatus?: string,
    transporterId?: number
  ): Promise<StatisticsOrderByTransporterDTO[]> {
    // This method could be implemented by filtering the in-memory `orders` array.
    return [];
  }

  public async getGeneralOrdersMetricsByCity(
    limit: number, page: number,
    minShipmentDate?: Date,
    maxShipmentDate?: Date,
    shipmentStatus?: string,
    transporterId?: number
  ): Promise<StatisticsOrderByCityDTO[]> {
    // This method could be implemented by filtering the in-memory `orders` array.
    return [];
  }
}