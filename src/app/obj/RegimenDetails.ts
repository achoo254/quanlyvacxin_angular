import { OrderDetails } from './OrderDetails';
import { Customer } from './Customer';
import { Regimen } from './Regimen';
import { UserInfo } from './UserInfo';
import { ProductDetails } from './ProductDetails';
export class RegimenDetails {
	regimenDetailsId : number;
  dateInject : Date;
  quantity: number;
  inject: boolean;
	regimenDetailsRegimen : Regimen;
	regimenDetailsProductDetails : ProductDetails;
  regimenDetailsCustomer : Customer;
  regimenDetailsUserInfo : UserInfo;
  listOrderDetails : OrderDetails[];
}
