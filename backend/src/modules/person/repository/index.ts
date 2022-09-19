import { keyspace, query } from "../../../shared/infra/database";
import { Person } from "../interface";

export class PersonRepository {
  public async getPeople() {
    const cql = `SELECT * FROM "${keyspace}"."person"`;
    const response = await query(cql);

    return response.rows;
  }

  public async getPersonById(id: string) {
    const cql = `
        SELECT * FROM "${keyspace}"."person"
        WHERE id = ?;
    `;
    const response = await query(cql, [id]);

    return response.rows;
  }

  public async createPerson(person: Person) {
    const cql = `
        INSERT INTO "${keyspace}"."person" (id, name, email)
        VALUES (uuid(), ?, ?);
    `;

    await query(cql, [person.name, person.email]);
  }

  public async updatePerson(id: string, person: Person) {
    const cql = `
        UPDATE "${keyspace}"."person"
        SET name = ?, email = ?
        WHERE id = ?;
    `;

    await query(cql, [person.name, person.email, id]);
  }

  public async deletePerson(id: string) {
    const cql = `
        DELETE FROM "${keyspace}"."person"
        WHERE id = ?;
    `;

    await query(cql, [id]);
  }
}
