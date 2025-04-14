import { MockUserRepository } from '../../mocks/repositories/MockUserRepository';
import { UserAlreadyExitsError, UserNotFoundError } from '../../../src/application/errors/userErrors';
import { MockOrderRepository } from '../../mocks/repositories/MockOrderRepository';
import { CreateShipmentOrderUseCase } from '../../../src/application/use_cases/orders/CreateShipmentOrderUseCase';
import { MockGeocodeService } from '../../mocks/services/MockGeocodeService';
import { MockMailService } from '../../mocks/services/MockEmailService';
import { CreateOrderDTO } from '../../../src/application/dto/order';
import { OrderSenderMatchesReceiver } from '../../../src/application/errors/orderErrors';
import { MockShortIdService } from '../../mocks/services/MockShortIdService';

describe(
  "Test Create Order", () => {

    const geocodeService : MockGeocodeService = new MockGeocodeService();
    const mailService : MockMailService = new MockMailService();
    const shortIdService : MockShortIdService = new MockShortIdService();

    let orderRepository : MockOrderRepository = new MockOrderRepository();
    let userRepository : MockUserRepository = new MockUserRepository();
    let createOrderUseCase : CreateShipmentOrderUseCase = new CreateShipmentOrderUseCase(
      orderRepository, geocodeService, mailService,
      shortIdService, userRepository
    );

    beforeAll( () => { jest.clearAllMocks(); })

    it('Should Create Order Successfully', async () => {

      const user1 = (await userRepository.save(
        "A", "B", "C", "D",
        "E", "F", "G", "G", "H", "I",
      ))!!

      const user2 = (await userRepository.save(
        "A", "B", "C", "D",
        "E", "F", "G", "G", "H", "I",
      ))!!

      const response = await createOrderUseCase.execute(
        <CreateOrderDTO>{
            "senderId": user1.getId(),
            "receiverId": user2.getId(),
            "productCategory": "test",
            "weightGrams": 200,
            "targetAddress": "Carrera 16 14 17 Apto 201 Postal Code 250251, Zipaquira, Colombia",
            "productDescription": "Test",
            "dimensionX": 2.3,
            "dimensionY": 2.4,
            "dimensionZ": 2.1,
            "quantity": 5,
            "sourceCityId": 1,
            "targetCityId": 2
        }
      )

      expect(response.order.getSenderId()).toBe(user1.getId());
      expect(response.order.getReceiverId()).toBe(user2.getId());
      expect(response.order.getProductCategory()).toBe("test");
      expect(response.order.getWeightGrams()).toBe(200);
      expect(response.order.getTargetAddress()).toBe("Carrera 16 14 17 Apto 201 Postal Code 250251, Zipaquira, Colombia");
      expect(response.order.getProductDescription()).toBe("Test");
      expect(response.order.getDimensionX()).toBeCloseTo(2.3, 2);
      expect(response.order.getDimensionY()).toBeCloseTo(2.4, 2);
      expect(response.order.getDimensionZ()).toBeCloseTo(2.1, 2);
      expect(response.order.getQuantity()).toBe(5);
      expect(response.order.getSourceCityId()).toBe(1);
      expect(response.order.getTargetCityId()).toBe(2);
    })

    it('Should Throw Invalid due to sender equals receiver', async () => {

      const user1 = (await userRepository.save(
        "A", "B", "C", "D",
        "E", "F", "G", "G", "H", "I",
      ))!!

      try{
        const response2 = await createOrderUseCase.execute(
          <CreateOrderDTO>{
              "senderId": user1.getId(),
              "receiverId": user1.getId(),
              "productCategory": "test",
              "weightGrams": 200,
              "targetAddress": "Carrera 16 14 17 Apto 201 Postal Code 250251, Zipaquira, Colombia",
              "productDescription": "Test",
              "dimensionX": 2.3,
              "dimensionY": 2.4,
              "dimensionZ": 2.1,
              "quantity": 5,
              "sourceCityId": 1,
              "targetCityId": 2
          }
        )
        } catch (e) {
            expect(e).toBeInstanceOf(OrderSenderMatchesReceiver)
        }
      })

    it('Should Throw Invalid due to user Not Found (Sender)', async () => {

      const user1 = (await userRepository.save(
        "A", "B", "C", "D",
        "E", "F", "G", "G", "H", "I",
      ))!!

      try{
        const response2 = await createOrderUseCase.execute(
          <CreateOrderDTO>{
              "senderId": user1.getId(),
              "receiverId": -1,
              "productCategory": "test",
              "weightGrams": 200,
              "targetAddress": "Carrera 16 14 17 Apto 201 Postal Code 250251, Zipaquira, Colombia",
              "productDescription": "Test",
              "dimensionX": 2.3,
              "dimensionY": 2.4,
              "dimensionZ": 2.1,
              "quantity": 5,
              "sourceCityId": 1,
              "targetCityId": 2
          }
        )
        } catch (e) {
            expect(e).toBeInstanceOf(UserNotFoundError)
        }
    })

    it('Should Throw Invalid due to user Not Found (Receiver)', async () => {

      const user1 = (await userRepository.save(
        "A", "B", "C", "D",
        "E", "F", "G", "G", "H", "I",
      ))!!

      try{
        const response2 = await createOrderUseCase.execute(
          <CreateOrderDTO>{
              "senderId": -1,
              "receiverId": user1.getId(),
              "productCategory": "test",
              "weightGrams": 200,
              "targetAddress": "Carrera 16 14 17 Apto 201 Postal Code 250251, Zipaquira, Colombia",
              "productDescription": "Test",
              "dimensionX": 2.3,
              "dimensionY": 2.4,
              "dimensionZ": 2.1,
              "quantity": 5,
              "sourceCityId": 1,
              "targetCityId": 2
          }
        )
        } catch (e) {
            expect(e).toBeInstanceOf(UserNotFoundError)
        }
    })
  }
)