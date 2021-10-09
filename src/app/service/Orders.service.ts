import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

constructor(private http: HttpClient) { }
  PostOrders(e){
    return this.http.post(
      'http://localhost:8081/orders/post/',e
    );
  }
  GetAllOrdersByMonth(year: number) {
    return this.http.get(
      'http://localhost:8081/orders/getAll/'+year
    );
  }
}
