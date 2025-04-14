import { Pool } from 'mysql2/promise';
import { ISeeder } from './ISeeder';
import { faker } from '@faker-js/faker';
import { UserSeeder } from './UserSeeder';
import { Transporter } from '../../../../domain/entities/Transporter';

export class TransporterSeeder implements ISeeder<Transporter> {

  pool : Pool;
  generatedEntitiesMapping : Map<number, Transporter>;
  userSeed : UserSeeder;

  constructor( pool : Pool, userSeeder : UserSeeder ) {
    this.pool = pool;
    this.generatedEntitiesMapping = new Map<number, Transporter>();
    this.userSeed = userSeeder;
  }

  public generate() {
    [...this.userSeed.generatedEntitiesMapping.values()].forEach(
      (user) => {
        const isTrasnporter = faker.datatype.boolean({ probability : 0.1 });

        if ( isTrasnporter ) {
          const transporter = new Transporter(
            user.getId(), user.getId(), faker.helpers.arrayElement(['ACTIVE', 'INACTIVE'])
          );
          this.generatedEntitiesMapping.set( transporter.getId(), transporter );
        }
      }
    );
  }

  public async insert() : Promise<void> {
    const values = [...this.generatedEntitiesMapping.values()].map(u => [
      u.getId(), u.getUserId(), u.getStatus()
    ]);

    const placeholders = values.map(() => '(?, ?, ?)').join(', ');
    const flatValues = values.flat();

    const insertQuery = `
      INSERT INTO transporter (
        tra_id, usr_id, tra_status
      ) VALUES ${placeholders}
    `;

    await this.pool.execute(insertQuery, flatValues);
  }
}