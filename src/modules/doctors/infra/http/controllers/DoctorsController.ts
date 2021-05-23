import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CREATED } from '@shared/constants/HttpStatusCode';
import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';

export default class DoctorsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, cellPhone, cep, crm, landline, specialtiesIds } = req.body;
    const createDoctor = container.resolve(CreateDoctorService);
    const response = await createDoctor.execute({
      name,
      cellPhone,
      cep,
      crm,
      landline,
      specialtiesIds,
    });
    return res.status(CREATED).json(classToClass(response));
  }
}
