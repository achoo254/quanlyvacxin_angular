import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../obj/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

constructor(private http: HttpClient) { }
  GetCustomerById(customerId : number){
    return this.http.get(
      'http://localhost:8081/customer/get/' + customerId
    );
  }

  GetCustomerByUserInfo(userInfoId : number){
    return this.http.get(
      'http://localhost:8081/customer/get/userInfo/' + userInfoId
    );
  }

  PostCustomer(e){
    return this.http.post(
      'http://localhost:8081/customer/post/',e
    );
  }

  PutCustomer(customerId : number, customer : Customer){
    return this.http.put(
      'http://localhost:8081/customer/put/'+customerId+'',customer
    );
  }

  GetCustomerByCustomerRoomId(customerRoomId : number){
    return this.http.get(
      'http://localhost:8081/customer/get/listCustomerRoom/' + customerRoomId
    );
  }
}
