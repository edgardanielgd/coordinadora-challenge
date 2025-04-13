import { Pool } from 'mysql2/promise';
import { ISeeder } from './ISeeder';
import { faker } from '@faker-js/faker';
import { Privilege } from '../../../../domain/entities/Privilege';
import { UserSeeder } from './UserSeeder';

export class PrivilegeSeeder implements ISeeder<Privilege> {

  pool : Pool;
  generatedEntitiesMapping : Map<number, Privilege>;
  userSeed : UserSeeder;

  constructor( pool : Pool, userSeeder : UserSeeder ) {
    this.pool = pool;
    this.generatedEntitiesMapping = new Map<number, Privilege>();
    this.userSeed = userSeeder;
  }

  public generate() {
    [...this.userSeed.generatedEntitiesMapping.values()].forEach(
      (user) => {
        const isAdmin = faker.datatype.boolean();
        const idPrivilegeUser = user.getId();
        const privilegeUser = new Privilege( idPrivilegeUser, user.getId(), 'USER');
        this.generatedEntitiesMapping.set( privilegeUser.getId(), privilegeUser );

        if ( isAdmin ) {
          const idPrivilegeAdmin = user.getId() * 2;
          const privilegeAdmin = new Privilege( idPrivilegeAdmin, user.getId(), 'ADMIN');
          this.generatedEntitiesMapping.set( privilegeAdmin.getId(), privilegeAdmin );
        };
      }
    );
  }

  public async insert() : Promise<void> {
    const values = [...this.generatedEntitiesMapping.values()].map(u => [
      u.getId(), u.getUserId(), u.getName()
    ]);

    const placeholders = values.map(() => '(?, ?, ?)').join(', ');
    const flatValues = values.flat();

    const insertQuery = `
      INSERT INTO privilege (
        prv_id, usr_id, prv_role
      ) VALUES ${placeholders}
    `;

    await this.pool.execute(insertQuery, flatValues);
  }
}