import { MockUserRepository } from '../../mocks/repositories/MockUserRepository';
import { MockOrderRepository } from '../../mocks/repositories/MockOrderRepository';
import { CreateShipmentOrderUseCase } from '../../../src/application/use_cases/orders/CreateShipmentOrderUseCase';
import { MockGeocodeService } from '../../mocks/services/MockGeocodeService';
import { MockMailService } from '../../mocks/services/MockEmailService';
import { AssignOrderDTO, CreateOrderDTO } from '../../../src/application/dto/order';
import { OrderSenderMatchesReceiver } from '../../../src/application/errors/orderErrors';
import { AssignShipmentOrderUseCase } from '../../../src/application/use_cases/orders/AssignShipmentOrderUseCase';
import { MockTransporterRepository } from '../../mocks/repositories/MockTransporterRepository';
import { VehicleRepository } from '../../../src/frameworks/database/repositories/VehicleRepository';
import { MockVehicleRepository } from '../../mocks/repositories/MockVehicleRepository';
import { RouteRepository } from '../../../src/frameworks/database/repositories/RouteRepository';
import { MockRouteRepository } from '../../mocks/repositories/MockRouteRepository';
import { MockCityRepository } from '../../mocks/repositories/MockCityRepository';

describe(
  "Test Assign Order", () => {

    const mailService : MockMailService = new MockMailService();

    let orderRepository : MockOrderRepository = new MockOrderRepository();
    let userRepository : MockUserRepository = new MockUserRepository();
    let transportRepository : MockTransporterRepository = new MockTransporterRepository();
    let vehicleRepository : MockVehicleRepository = new MockVehicleRepository();
    let cityRepository : MockCityRepository = new MockCityRepository();
    let routeRepository : MockRouteRepository = new MockRouteRepository();
    let assignOrderUseCase : AssignShipmentOrderUseCase = new AssignShipmentOrderUseCase(
      orderRepository,transportRepository, routeRepository, vehicleRepository,
      cityRepository, userRepository, mailService
    )

    beforeAll( () => { jest.clearAllMocks(); })

    it('Should Assign Order Successfully', async () => {

      const user1 = (await userRepository.save(
        "A", "B", "C", "D",
        "E", "F", "G", "G", "H", "I",
      ))!!

      const user2 = (await userRepository.save(
        "A", "B", "C", "D",
        "E", "F", "G", "G", "H", "I",
      ))!!

      const order1 = (await orderRepository.save(
        user1.getId(), user2.getId(), "test", 200,
        "Carrera 16 14 17 Apto 201 Postal Code 250251, Zipaquira, Colombia", "Test",
        2.3, 2.4, 2.1, 5, 'EN ESPERA', 1, 2, 2.3, 2.4, 'solved', 'solved', 'A123'
      ))!!

      const response = await assignOrderUseCase.execute(
        <AssignOrderDTO>{
          orderShortId: order1.getShortId(),
          transporterId: 1,
          routeId: 1,
          expectedReachData: new Date('2025-02-03'),
          vehicleId: 1,
        }
      )

      console.log(response.order.getTransporterId())

      expect(response.order.getTransporterId()).toBe(1);
      expect(response.order.getRouteId()).toBe(1);
      expect(response.order.getVehicleId()).toBe(1);
    })

  }
)