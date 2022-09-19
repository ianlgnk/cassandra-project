import { Request, Response } from "express";
import { AppError } from "../../../shared/error";
import { PersonService } from "../service";

const service = new PersonService();

export class PersonController {
  async listAll(request: Request, response: Response): Promise<any> {
    try {
      const result = await service.getPeople();

      return response.status(200).json(result);
    } catch (e) {
      throw new AppError(500, e);
    }
  }

  async findById(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.params;
      const result = await service.getPersonById(id);

      return response.status(200).json(result);
    } catch (e) {
      throw new AppError(500, e);
    }
  }

  async create(request: Request, response: Response): Promise<any> {
    try {
      const { name, email } = request.body;
      const result = service.createPerson({ id: null, name, email });

      return response.status(201).json(result);
    } catch (e) {
      throw new AppError(500, e);
    }
  }

  async update(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.params;
      const { name, email } = request.body;
      const result = await service.updatePerson(id, { id, name, email });

      return response.status(200).json(result);
    } catch (e) {
      throw new AppError(500, e);
    }
  }

  async delete(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.params;
      const result = await service.deletePerson(id);

      return response.status(200).json(result);
    } catch (e) {
      throw new AppError(500, e);
    }
  }
}
