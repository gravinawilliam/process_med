import cep from 'cep-promise';
import IAddressDTO from '../interfaces/dtos/IAddressDTO';
import ICepProvider from '../interfaces/ICepProvider';

export default class CepPromisseCepProvider implements ICepProvider {
  public async getAddress(data: string): Promise<IAddressDTO> {
    const address = await cep(data);
    return address;
  }
}
