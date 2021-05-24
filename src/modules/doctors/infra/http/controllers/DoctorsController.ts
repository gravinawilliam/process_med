import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CREATED, NO_CONTENT, OK } from '@shared/constants/HttpStatusCode';
import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import UpdateDoctorService from '@modules/doctors/services/UpdateDoctorService';
import DeleteDoctorService from '@modules/doctors/services/DeleteDoctorService';
import SearchDoctorsService from '@modules/doctors/services/SearchDoctorsService';

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

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteDoctor = container.resolve(DeleteDoctorService);
    const response = await deleteDoctor.execute({
      doctorId: id,
    });
    return res.status(NO_CONTENT).json(classToClass(response));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { cellPhone, cep, crm, landline, name } = req.query;
    const searchDoctors = container.resolve(SearchDoctorsService);
    const response = await searchDoctors.execute({
      cellPhone: String(cellPhone),
      cep: String(cep),
      crm: String(crm),
      landline: String(landline),
      name: String(name),
    });
    return res.status(OK).json(classToClass(response));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, cellPhone, cep, crm, landline, specialtiesIds } = req.body;
    const updateDoctor = container.resolve(UpdateDoctorService);
    const response = await updateDoctor.execute({
      doctorId: id,
      name,
      cellPhone,
      cep,
      crm,
      landline,
      specialtiesIds,
    });
    return res.status(OK).json(classToClass(response));
  }
}
