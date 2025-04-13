import { Request, Response, NextFunction } from 'express';
import { ICreateShipmentOrderUseCase } from '../../application/use_cases/orders/ICreateShipmentOrderUseCase';
import { AssignOrderDTO, CreateOrderDTO } from '../../application/dto/order';
import { IAssignShipmentOrderUseCase } from '../../application/use_cases/orders/IAssignShipmentOrderUseCase';
import { IGetShipmentOrderStateUseCase } from '../../application/use_cases/orders/IGetShipmentOrderStateUseCase';

export class OrderController {

  private createShipmentOrderUseCase : ICreateShipmentOrderUseCase;
  private assignShipmentOrderUseCase : IAssignShipmentOrderUseCase;
  private getShipmentStateOrderUseCase : IGetShipmentOrderStateUseCase;

  constructor(
    createShipmentOrderUseCase : ICreateShipmentOrderUseCase,
    assignShipmentOrderUseCase : IAssignShipmentOrderUseCase,
    getShipmentStateOrderUseCase : IGetShipmentOrderStateUseCase,
  ) {
    this.createShipmentOrderUseCase = createShipmentOrderUseCase;
    this.assignShipmentOrderUseCase = assignShipmentOrderUseCase;
    this.getShipmentStateOrderUseCase = getShipmentStateOrderUseCase;
  }

  public create = async (req : Request, res : Response, next : NextFunction) : Promise<any> => {
      try {
        const createUserDTO : CreateOrderDTO = {
          senderId: req.body.senderId,
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

        return res.status(201).json({
          message: "Successfully created shipment order with the following info",
          orderCreateResponse
        });
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

      return res.status(200).json({
        message: "Successfully assigned shipment order to route and transporter",
        assignCaseResponse
      });
    }
    catch ( error ) {

      next(error)
    }
  }

  public query = async (req : Request, res : Response, next : NextFunction) : Promise<any> => {
    try {
      const shortId = req.params.shortId;

      const getShipmentOrderResponse = await this.getShipmentStateOrderUseCase.execute( shortId );

      return res.status(201).json({
        message: "Successfully queried shipment order",
        getShipmentOrderResponse
      });
    }
    catch ( error ) {

      next(error)
    }
  }


}