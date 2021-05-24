import IAddressDTO from '../interfaces/dtos/IAddressDTO';
import ICepProvider from '../interfaces/ICepProvider';

export default class FakeCepProvider implements ICepProvider {
  public async getAddress(cep: string): Promise<IAddressDTO> {
    if (cep === 'invalid') {
      throw new Error('');
    } else {
      const address = {
        cep,
        city: 'Ubá',
        state: 'US',
        neighborhood: 'Perdizes',
        street: 'Rua Azul',
      };
      return address;
    }
  }
}
