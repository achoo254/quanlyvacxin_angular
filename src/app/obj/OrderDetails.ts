import { RegimenDetails } from './RegimenDetails';
import { Customer } from './Customer';
import { Orders } from './Orders';
import { Product } from './Product';
export class OrderDetails {
  orderDetailsId : number;
  quantity : number;
  price : number;
  orderDetailsOrder : Orders;
  orderDetailsRegimenDetails : RegimenDetails;
}
