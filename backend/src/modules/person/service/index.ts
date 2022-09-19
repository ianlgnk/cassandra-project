import { AppError } from "./../../../shared/error/index";
import { Person } from "../interface";
import { PersonRepository } from "../repository";

export class PersonService {
  private repository: PersonRepository = new PersonRepository();

  public async getPeople() {
    return await this.repository.getPeople();
  }

  public async getPersonById(id: string) {
    return await this.repository.getPersonById(id);
  }

  public async createPerson(person: Person) {
    await this.repository.createPerson(person);
  }

  public async updatePerson(id: string, person: Person) {
    await this.repository.updatePerson(id, person);
  }

  public async deletePerson(id: string) {
    await this.repository.deletePerson(id);
  }
}
