import { RegimenDetails } from './RegimenDetails';
import { UserInfo } from './UserInfo';
import { CustomerRoom } from "./CustomerRoom";
import { Notify } from './Notify';

export class Customer {
  customerId: number;
  contactName: string;
  contactPhone: string;
  customerUserInfo: UserInfo;
  listCustomerRoom: CustomerRoom[];
  listRegimenDetails: RegimenDetails[];
  listNotify: Notify[];
}
