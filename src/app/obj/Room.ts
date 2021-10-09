import { CustomerRoom } from "./CustomerRoom";

export class Room {
  roomId: number;
  name: string;
  status: boolean;
  code: string;
  listCustomerRoom: CustomerRoom[];
}
