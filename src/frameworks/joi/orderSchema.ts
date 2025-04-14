import Joi from 'joi';

export const createOrderSchema = Joi.object({
  receiverId: Joi.number().integer().required(),
  productCategory: Joi.string().min(1).max(255).required(),
  weightGrams: Joi.number().min(0).max(1000000).required(),
  targetAddress: Joi.string().min(1).max(500).required(),
  productDescription: Joi.string().min(1).required(),
  dimensionX: Joi.number().required(),
  dimensionY: Joi.number().required(),
  dimensionZ: Joi.number().required(),
  quantity: Joi.number().integer().positive().required(),
  sourceCityId: Joi.number().integer().required(),
  targetCityId: Joi.number().integer().required()
});

export const assignOrderSchema = Joi.object({
  transporterId: Joi.number().required(),
  routeId: Joi.number().required(),
  expectedReachData: Joi.date().required(),
  vehicleId: Joi.number().required()
});