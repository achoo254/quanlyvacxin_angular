import { OrderDetails } from './OrderDetails';
export class Orders {
  orderId : number;
  datePrinted : Date;
  total : number;
  listOrderDetails : OrderDetails[];
}
