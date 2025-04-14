import { Request, Response, NextFunction } from 'express';
import { ICreateShipmentOrderUseCase } from '../../application/use_cases/orders/ICreateShipmentOrderUseCase';
import { AssignOrderDTO, CreateOrderDTO } from '../../application/dto/order';
import { IAssignShipmentOrderUseCase } from '../../application/use_cases/orders/IAssignShipmentOrderUseCase';
import { IGetShipmentOrderStateUseCase } from '../../application/use_cases/orders/IGetShipmentOrderStateUseCase';
import { IQueryStatisticsUseCase } from '../../application/use_cases/orders/IQueryStatisticsUseCase';
import { AuthPayload } from '../../application/services/IAuthService';

export class OrderController {

  private createShipmentOrderUseCase : ICreateShipmentOrderUseCase;
  private assignShipmentOrderUseCase : IAssignShipmentOrderUseCase;
  private getShipmentStateOrderUseCase : IGetShipmentOrderStateUseCase;
  private queryStatisticsUseCase : IQueryStatisticsUseCase

  constructor(
    createShipmentOrderUseCase : ICreateShipmentOrderUseCase,
    assignShipmentOrderUseCase : IAssignShipmentOrderUseCase,
    getShipmentStateOrderUseCase : IGetShipmentOrderStateUseCase,
    queryStatisticsUseCase : IQueryStatisticsUseCase,
  ) {
    this.createShipmentOrderUseCase = createShipmentOrderUseCase;
    this.assignShipmentOrderUseCase = assignShipmentOrderUseCase;
    this.getShipmentStateOrderUseCase = getShipmentStateOrderUseCase;
    this.queryStatisticsUseCase = queryStatisticsUseCase;
  }

  public create = async (req : Request, res : Response, next : NextFunction) : Promise<any> => {

      const userId = res.locals.claims.user.getId();

      try {
        const createUserDTO : CreateOrderDTO = {
          senderId: userId,
          receiverId: req.body.receiverId,
          productCategory: req.body.productCategory,
          weightGrams: req.body.weightGrams,
          targetAddress: req.body.targetAddress,
          productDescription: req.body.productDescription,
          dimensionX: req.body.dimensionX,
          dimensionY: req.body.dimensionY,
          dimensionZ: req.body.dimensionZ,
          quantity: req.body.quantity,
          sourceCityId: req.body.sourceCityId,
          targetCityId: req.body.targetCityId
        };

        const orderCreateResponse = await this.createShipmentOrderUseCase.execute( createUserDTO );

        return res.status(201).json(orderCreateResponse);
      }
      catch ( error ) {

        next(error)
      }
  }

  public assign = async (req : Request, res : Response, next : NextFunction) : Promise<any> => {
    try {
      const assignOrderDTO : AssignOrderDTO = {
        orderShortId: req.params.shortId,
        transporterId: req.body.transporterId,
        routeId: req.body.routeId,
        expectedReachData: req.body.expectedReachData,
        vehicleId: req.body.vehicleId,
      };

      const assignCaseResponse = await this.assignShipmentOrderUseCase.execute( assignOrderDTO );

      return res.status(200).json(assignCaseResponse);
    }
    catch ( error ) {

      next(error)
    }
  }

  public query = async (req : Request, res : Response, next : NextFunction) : Promise<any> => {
    try {
      const authData : AuthPayload = res.locals.claims;
      const shortId = req.params.shortId;

      const getShipmentOrderResponse = await this.getShipmentStateOrderUseCase.execute( shortId, authData );

      return res.status(201).json(getShipmentOrderResponse);
    }
    catch ( error ) {

      next(error)
    }
  }

  public statistics = async (req : Request, res : Response, next : NextFunction) : Promise<any> => {
    try {
      const minDateRaw = req.query.minOrderAssignedDate?.toString();
      const minDate = minDateRaw && !isNaN(Date.parse(minDateRaw)) ? new Date(minDateRaw) : undefined;

      const maxDateRaw = req.query.maxOrderAssignedDate?.toString();
      const maxDate = maxDateRaw && !isNaN(Date.parse(maxDateRaw)) ? new Date(maxDateRaw) : undefined;

      const status = req.query.status?.toString();
      const groupby = req.query.groupBy?.toString();
      const limit = parseInt( req.query.limit?.toString() || '' );
      const page = parseInt( req.query.page?.toString() || '' );
      const transporterId =  parseInt( req.query.transporterId?.toString() || '' );

      const getShipmentOrderResponse = await this.queryStatisticsUseCase.execute(
        groupby, limit, page, minDate, maxDate, status, transporterId
      );

      return res.status(200).json(getShipmentOrderResponse);
    }
    catch ( error ) {

      next(error)
    }
  }


}