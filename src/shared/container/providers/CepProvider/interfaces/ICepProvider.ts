import IAddressDTO from './dtos/IAddressDTO';

export default interface ICepProvider {
  getAddress(cep: string): Promise<IAddressDTO>;
}
