import { Pool } from 'mysql2/promise';
import { ISeeder } from './ISeeder';
import { faker } from '@faker-js/faker';
import { Vehicle } from '../../../../domain/entities/Vehicle';

export class VehicleSeeder implements ISeeder<Vehicle> {
  private pool: Pool;
  private count: number;
  public generatedEntitiesMapping: Map<number, Vehicle>;

  constructor(pool: Pool, count: number) {
    this.pool = pool;
    this.count = count;
    this.generatedEntitiesMapping = new Map<number, Vehicle>();
  }

  public generate(): void {
    Array.from({ length: this.count }, (_, i) => i + 1).forEach(i => {
      const id = i + 1;
      const name = `${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`;
      const capacity = faker.number.int({ min: 1000, max: 10000 });
      const vehicle = new Vehicle(id, name, capacity);
      this.generatedEntitiesMapping.set(id, vehicle);
    });
  }

  public async insert(): Promise<void> {
    const values = [...this.generatedEntitiesMapping.values()].map(v => [
      v.getId(),
      v.getName(),
      v.getCapacity()
    ]);

    const placeholders = values.map(() => '(?, ?, ?)').join(', ');
    const flatValues = values.flat();

    const insertQuery = `
      INSERT INTO vehicle (
        veh_id, veh_name, veh_capacity
      ) VALUES ${placeholders}
    `;

    await this.pool.execute(insertQuery, flatValues);
  }
}