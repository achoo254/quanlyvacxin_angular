import { Customer } from "./Customer";
import { Room } from "./Room";

export class Notify {
  notifyId : number;
  details : string;
  dates : Date;
  status : boolean;
  notifyCustomer : Customer;
  notifyRoom : Room;
}
