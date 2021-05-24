import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CREATED, OK } from '@shared/constants/HttpStatusCode';
import CreateSpecialtyService from '@modules/specialties/services/CreateSpecialtyService';
import ListSpecialtiesService from '@modules/specialties/services/ListSpecialtiesService';

export default class SpecialtiesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const createSpecialty = container.resolve(CreateSpecialtyService);
    const response = await createSpecialty.execute({
      name,
    });
    return res.status(CREATED).json(classToClass(response));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listSpecialties = container.resolve(ListSpecialtiesService);
    const response = await listSpecialties.execute();
    return res.status(OK).json(classToClass(response));
  }
}
