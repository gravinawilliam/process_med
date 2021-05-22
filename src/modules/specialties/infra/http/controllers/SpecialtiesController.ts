import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CREATED } from '@shared/constants/HttpStatusCode';
import CreateSpecialtyService from '@modules/specialties/services/CreateSpecialtyService';

export default class SpecialtiesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const createSpecialty = container.resolve(CreateSpecialtyService);
    const response = await createSpecialty.execute({
      name,
    });
    return res.status(CREATED).json(classToClass(response));
  }
}
