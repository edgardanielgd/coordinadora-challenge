import { IOrderRepository } from "../../repositories/IOrderRepository";
import { IQueryStatisticsUseCase } from "./IQueryStatisticsUseCase";
import { StatisticsOrderByCityDTO, StatisticsOrderByTransporterDTO, StatisticsOrderDTO } from "../../dto/statistics";

export class QueryStatisticsUseCase implements IQueryStatisticsUseCase {

  private orderRepository : IOrderRepository;

  constructor (
    orderRepository : IOrderRepository,
  ) {
    this.orderRepository = orderRepository;
  }

  public async execute(
    groupBy?: string,
    limit?: number,
    page?: number,
    minShipmentDate? : Date,
    maxShipmentDate? : Date,
    shipmentStatus? : string,
    transporterId?: number,
  ) : Promise<StatisticsOrderDTO | StatisticsOrderByCityDTO[] | StatisticsOrderByTransporterDTO[]> {

    if ( !limit || limit <= 0 ) limit = 10;
    if ( !page || page <= 0 ) page = 1;

    if ( groupBy == 'city' ) {
      const generalStatisticsByCity = await this.orderRepository.getGeneralOrdersMetricsByCity(
        limit, page - 1, minShipmentDate, maxShipmentDate, shipmentStatus, transporterId
      );

      if ( !generalStatisticsByCity ) {
        throw new Error('Unable to calculate metrics');
      }

      return generalStatisticsByCity;
    }

    if ( groupBy == 'transporter' ) {
      const generalStatisticsByTransporter = await this.orderRepository.getGeneralOrdersMetricsByTransporter(
        limit, page - 1, minShipmentDate, maxShipmentDate, shipmentStatus, transporterId
      );

      if ( !generalStatisticsByTransporter ) {
        throw new Error('Unable to calculate metrics');
      }

      return generalStatisticsByTransporter;
    }

    const generalStatistics = await this.orderRepository.getGeneralOrdersMetrics(
      minShipmentDate, maxShipmentDate, shipmentStatus, transporterId
    );

    if ( !generalStatistics ) {
      throw new Error('Unable to calculate metrics');
    }

    return generalStatistics;
  }

}