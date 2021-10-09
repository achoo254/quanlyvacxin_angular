import { RegimenDetails } from './RegimenDetails';
import { Customer } from 'src/app/obj/Customer';
export class UserInfo {
  userInfoId: number;
  address: string;
  age: number;
  birthday: Date;
  email: string;
  fullName: string;
  password: string;
  repassword: string;
  telephone: string;
  roles: string;
  status: boolean;
  token: string;
  listCustomer: Customer[];
  listRegimenDetails: RegimenDetails[];
}
