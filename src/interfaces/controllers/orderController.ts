import { Request, Response, NextFunction } from 'express';
import { ICreateShipmentOrderUseCase } from '../../application/use_cases/orders/ICreateShipmentOrderUseCase';
import { CreateOrderDTO } from '../../application/dto/order';

export class OrderController {

  private createShipmentOrderUseCase : ICreateShipmentOrderUseCase;

  constructor(
    createShipmentOrderUseCase : ICreateShipmentOrderUseCase,
  ) {
    this.createShipmentOrderUseCase = createShipmentOrderUseCase;
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
}