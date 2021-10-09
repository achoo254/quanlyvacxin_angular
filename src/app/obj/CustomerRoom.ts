import { Room } from 'src/app/obj/Room';
import { Customer } from 'src/app/obj/Customer';
export class CustomerRoom {
  customerRoomId: number;
  status: string;
  orderBy: number;
  customerRoomCustomer: Customer;
  customerRoomRoom: Room;
}
