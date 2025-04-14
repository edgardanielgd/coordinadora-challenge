import { Pool } from 'mysql2/promise';
import { ISeeder } from './ISeeder';
import { faker } from '@faker-js/faker';
import { City } from '../../../../domain/entities/City';

export class CitySeeder implements ISeeder<City> {
    private pool: Pool;
    private count: number;
    public generatedEntitiesMapping: Map<number, City>;

    constructor(pool: Pool, count: number) {
      this.pool = pool;
      this.count = count;
      this.generatedEntitiesMapping = new Map<number, City>();
    }

    public generate(): void {
      Array.from({ length: this.count }, (_, i) => i + 1).forEach(i => {
        const id = i;
        const name = faker.location.city();
        const entity = new City(id, name);
        this.generatedEntitiesMapping.set(id, entity);
      });
    }

    public async insert(): Promise<void> {
      const values = [...this.generatedEntitiesMapping.values()].map(e => [
        e.getId(),
        e.getName()
      ]);

      const placeholders = values.map(() => '(?, ?)').join(', ');
      const flatValues = values.flat();

      const insertQuery = `
        INSERT INTO city (
          cit_id, cit_name
        ) VALUES ${placeholders}
      `;

      await this.pool.execute(insertQuery, flatValues);
    }
  }