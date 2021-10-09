import { CustomerRoom } from './../obj/CustomerRoom';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerRoomService {

constructor(private http: HttpClient) { }
  GetAllCustomerRoom(){
    return this.http.get(
      'http://localhost:8081/customerRoom/getAll/'
    );
  }

  GetCustomerRoomById(roomId : number){
    return this.http.get(
      'http://localhost:8081/customerRoom/get/'+ roomId
    );
  }

  GetAllCustomerRoomByRoomId(roomId : number){
    return this.http.get(
      'http://localhost:8081/customerRoom/getAll/roomId/'+ roomId
    );
  }

  PostCustomerRoom(e){
    return this.http.post(
      'http://localhost:8081/customerRoom/post/',e
    );
  }

  GetOrderByById(roomId : number){
    return this.http.get(
      'http://localhost:8081/customerRoom/get/orderBy/'+ roomId
    );
  }

  PutCustomerRoom(customerRoomId: number, customerRoom : CustomerRoom){
    return this.http.put(
      'http://localhost:8081/customerRoom/put/'+ customerRoomId , customerRoom
    );
  }

  DeleteAllCustomerRoom(token : string, telephone: string){
    return this.http.delete(
      'http://localhost:8081/customerRoom/deleteAll/'+ token + '/' + telephone
    );
  }
}
