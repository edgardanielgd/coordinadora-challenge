import { Pool } from 'mysql2/promise';
import { ISeeder } from './ISeeder';
import { faker } from '@faker-js/faker';
import { UserSeeder } from './UserSeeder';
import { Route } from '../../../../domain/entities/Route';
import { CitySeeder } from './CitySeeder';

interface CityRoute {
    cityId: number,
    routeId: number;
}

export class RouteSeeder implements ISeeder<Route> {

  count : number;
  pool : Pool;
  generatedEntitiesMapping : Map<number, Route>;
  citySeed : CitySeeder;
  cityRouteIds: CityRoute[];

  constructor( pool : Pool, count : number, citySeeder : CitySeeder ) {
    this.pool = pool;
    this.count = count;
    this.generatedEntitiesMapping = new Map<number, Route>();
    this.citySeed = citySeeder;
    this.cityRouteIds = [];
  }

  public generate() {

    const cities = [...this.citySeed.generatedEntitiesMapping.values()];

    Array.from({ length: this.count }, (_, i) => i + 1).forEach(i => {

        const number = faker.number.int({min: 2, max: 5});
        const routeCities = faker.helpers.arrayElements(cities, number);

        const firstCity = routeCities[0];
        const lastCity = routeCities[ routeCities.length - 1];

        const routeName = `${firstCity.getName()} - ${lastCity.getName()}`;

        const route = new Route( i, routeName );

        this.generatedEntitiesMapping.set( route.getId(), route );

        this.cityRouteIds = this.cityRouteIds.concat(
            routeCities.map(
                city => <CityRoute>{
                    cityId: city.getId(),
                    routeId: route.getId()
                }
            )
        )

    });
  }

  public async insert() : Promise<void> {
    const values = [...this.generatedEntitiesMapping.values()].map(u => [
      u.getId(), u.getName()
    ]);

    const placeholders = values.map(() => '(?, ?)').join(', ');
    const flatValues = values.flat();

    const insertQuery = `
      INSERT INTO route (
        rou_id, rou_name
      ) VALUES ${placeholders}
    `;

    await this.pool.execute(insertQuery, flatValues);

    await this.insertCityRoutes();
  }

  private async insertCityRoutes() : Promise<void> {
    const values = this.cityRouteIds.map(u => [
        u.cityId, u.routeId
      ]);

      const placeholders = values.map(() => '(?, ?)').join(', ');
      const flatValues = values.flat();

      const insertQuery = `
        INSERT INTO city_route (
          cit_id, rou_id
        ) VALUES ${placeholders}
      `;

      await this.pool.execute(insertQuery, flatValues);
  }
}