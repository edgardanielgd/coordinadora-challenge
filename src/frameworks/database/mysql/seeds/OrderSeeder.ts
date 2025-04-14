import { Pool } from 'mysql2/promise';
import { ISeeder } from './ISeeder';
import { faker } from '@faker-js/faker';
import { UserSeeder } from './UserSeeder';
import { Route } from '../../../../domain/entities/Route';
import { CitySeeder } from './CitySeeder';
import { Order } from '../../../../domain/entities/Order';
import { RouteSeeder } from './RouterSeeder';
import { TransporterSeeder } from './TransporterSeeder';
import { VehicleSeeder } from './VehicleSeeder';

export class OrderSeeder implements ISeeder<Order> {

  count : number;
  pool : Pool;
  generatedEntitiesMapping : Map<number, Order>;

  citySeed : CitySeeder;
  userSeed : UserSeeder;
  routeSeed: RouteSeeder;
  transporterSeed: TransporterSeeder;
  vehicleSeed: VehicleSeeder;

  constructor(
    pool : Pool, count : number, citySeeder : CitySeeder,
    userSeeder: UserSeeder, routeSeeder : RouteSeeder,
    transporterSeeder: TransporterSeeder, vehicleSeeder : VehicleSeeder
  ) {
    this.pool = pool;
    this.count = count;
    this.generatedEntitiesMapping = new Map<number, Order>();
    this.citySeed = citySeeder;
    this.userSeed = userSeeder;
    this.routeSeed = routeSeeder;
    this.transporterSeed = transporterSeeder;
    this.vehicleSeed = vehicleSeeder;
  }

  public generate() {

    Array.from({ length: this.count }, (_, i) => i + 1).forEach(i => {

        const sourceCity = faker.helpers.arrayElement( [...this.citySeed.generatedEntitiesMapping.values()] )
        const targetCity = faker.helpers.arrayElement( [...this.citySeed.generatedEntitiesMapping.values()] )

        const sourceUser = faker.helpers.arrayElement( [...this.userSeed.generatedEntitiesMapping.values()] )
        const targetUser = faker.helpers.arrayElement( [...this.userSeed.generatedEntitiesMapping.values()] )

        const route = faker.helpers.arrayElement( [...this.routeSeed.generatedEntitiesMapping.values()] )
        const transporter = faker.helpers.arrayElement( [...this.transporterSeed.generatedEntitiesMapping.values()] )
        const vehicle = faker.helpers.arrayElement( [...this.vehicleSeed.generatedEntitiesMapping.values()] )

        const order = new Order(
            i, sourceUser.getId(), targetUser.getId(), faker.commerce.productName(), faker.number.float({min: 20, max: 1000}),
            faker.location.streetAddress(), faker.commerce.productDescription(), faker.number.float(), faker.number.float(),
            faker.number.float(), faker.number.int({min: 1, max: 5}), faker.helpers.arrayElement(['EN ESPERA', 'EN TRANSPORTE', 'ENTREGADO']),
            transporter.getId(), route.getId(), sourceCity.getId(), targetCity.getId(), faker.location.latitude(), faker.location.longitude(),
            faker.location.streetAddress(), faker.location.city(), faker.date.between({ from: '2024-06-01', to: '2024-12-31'}),
            faker.date.between({ from: '2025-01-01', to: '2025-03-01'}), faker.date.between({ from : '2024-01-01', to: '2025-03-01'}),
            faker.string.uuid(), vehicle.getId()
        )

        this.generatedEntitiesMapping.set( order.getId(), order );
    });
  }

  public async insert() : Promise<void> {

    const totalOrders = [...this.generatedEntitiesMapping.values()];

    for(let i = 0; i < this.generatedEntitiesMapping.size; i += 1000) {

      const values = totalOrders.slice(i, i + 1000).map(o => [
          o.getId(), o.getSenderId(), o.getReceiverId(), o.getProductCategory(), o.getWeightGrams(),
          o.getTargetAddress(), o.getProductDescription(), o.getDimensionX(), o.getDimensionY(), o.getDimensionZ(),
          o.getQuantity(), o.getStatus(), o.getTransporterId(), o.getRouteId(), o.getSourceCityId(),
          o.getTargetCityId(), o.getLatitude(), o.getLongitude(), o.getSolvedAddress(), o.getSolvedCity(),
          o.getAssignedDate(), o.getExpectedReachDate(), o.getActualReachDate(), o.getShortId(), o.getVehicleId()
      ]);

      const placeholders = values.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ');
      const flatValues = values.flat();

      const insertQuery = `
          INSERT INTO \`order\` (
              ord_id, ord_sender_id, ord_receiver_id, ord_product_category, ord_weight_grams,
              ord_target_address, ord_product_description, ord_dimension_x, ord_dimension_y, ord_dimension_z,
              ord_quantity, ord_status, ord_transporter_id, ord_route_id, ord_source_city_id,
              ord_target_city_id, ord_latitude, ord_longitude, ord_solved_address, ord_solved_city,
              ord_assigned_date, ord_expected_reach_date, ord_actual_reach_date, ord_short_id, ord_vehicle_id
          ) VALUES ${placeholders}
          `;

      await this.pool.execute(insertQuery, flatValues);
    }

  }
}