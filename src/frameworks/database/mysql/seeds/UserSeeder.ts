import { Pool } from 'mysql2/promise';
import { ISeeder } from './ISeeder';
import { User } from '../../../../domain/entities/User';
import { faker } from '@faker-js/faker';

export class UserSeeder implements ISeeder<User> {

  pool : Pool;
  count : number;
  generatedEntitiesMapping : Map<number, User>;

  constructor( pool : Pool, count : number ) {
    this.pool = pool;
    this.count = count;
    this.generatedEntitiesMapping = new Map<number, User>();
  }

  public generate() {
    Array.from({ length: this.count }, (_, i) => i + 1).forEach(i => {

        const user = new User(
          i, `${i}-${faker.internet.username()}`, `${i}-${faker.string.numeric()}`,
          'CC', faker.string.alphanumeric(), `${i}-${faker.internet.email()}`,
          'ACTIVE', faker.person.firstName(), faker.person.firstName(), faker.person.lastName(),
          faker.person.lastName()
        );

        this.generatedEntitiesMapping.set( user.getId(), user );

      }
    );
  }

  public async insert( ) : Promise<void> {

    const values = [...this.generatedEntitiesMapping.values()].map(u => [
      u.getId(),
      u.getUsername(), u.getDocument(), u.getDocumentType(), u.getPassword(),
      u.getEmail(), u.getStatus(), u.getFirstName(), u.getSecondName() ?? null,
      u.getFirstSurname(), u.getSecondSurname() ?? null
    ]);

    const placeholders = values.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ');
    const flatValues = values.flat();

    const insertQuery = `
      INSERT INTO user (
        usr_id,
        usr_username, usr_document, usr_document_type, usr_password,
        usr_email, usr_status, usr_first_name, usr_second_name,
        usr_first_surname, usr_second_surname
      ) VALUES ${placeholders}
    `;

    await this.pool.execute(insertQuery, flatValues);
  }
}