import { StatisticsOrderByCityDTO, StatisticsOrderByTransporterDTO, StatisticsOrderDTO } from "../../dto/statistics";

export interface IQueryStatisticsUseCase {

  execute(
    groupBy?: string,
    limit?: number,
    page?: number,
    minShipmentDate? : Date,
    maxShipmentDate? : Date,
    shipmentStatus? : string,
    transporterId?: number,
  ) : Promise<StatisticsOrderDTO | StatisticsOrderByCityDTO[] | StatisticsOrderByTransporterDTO[]>;

}