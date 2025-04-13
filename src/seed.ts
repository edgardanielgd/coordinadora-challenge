import { config } from './frameworks/config/config'

import { getPool } from './frameworks/database/mysql/pool';
import { CitySeeder } from './frameworks/database/mysql/seeds/CitySeeder';
import { OrderSeeder } from './frameworks/database/mysql/seeds/OrderSeeder';
import { PrivilegeSeeder } from './frameworks/database/mysql/seeds/PrivilegeSeeder';
import { RouteSeeder } from './frameworks/database/mysql/seeds/RouterSeeder';
import { TransporterSeeder } from './frameworks/database/mysql/seeds/TransporterSeeder';
import { UserSeeder } from './frameworks/database/mysql/seeds/UserSeeder';
import { VehicleSeeder } from './frameworks/database/mysql/seeds/VehicleSeeder';

const pool = getPool({
    dbHost: config.dbHost,
    dbPort: config.dbPort,
    dbUser: config.dbUser,
    dbPassword: config.dbPassword,
    dbDatabase: config.dbDatabase,
});

const execute = async () => {

    const userSeeder = new UserSeeder( pool, 1000 );
    userSeeder.generate();
    await userSeeder.insert();

    const privilegeSeeder = new PrivilegeSeeder( pool, userSeeder );
    privilegeSeeder.generate();
    await privilegeSeeder.insert();

    const citiesSeeder = new CitySeeder( pool, 100 );
    citiesSeeder.generate();
    await citiesSeeder.insert();

    const transporterSeeder = new TransporterSeeder( pool, userSeeder );
    transporterSeeder.generate();
    await transporterSeeder.insert();

    const vehicleSeeder = new VehicleSeeder( pool, 100 );
    vehicleSeeder.generate();
    await vehicleSeeder.insert();

    const routeSeeder = new RouteSeeder( pool, 20, citiesSeeder );
    routeSeeder.generate();
    await routeSeeder.insert();

    const orderSeeder = new OrderSeeder(
        pool, 10000, citiesSeeder, userSeeder, routeSeeder,
        transporterSeeder, vehicleSeeder
    );
    orderSeeder.generate();
    await orderSeeder.insert();

    console.log("Finished data insertion");

    await pool.end();
}

execute();