import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

constructor(private http: HttpClient) { }
  PostOrderDetails(e){
    return this.http.post(
      'http://localhost:8081/orderDetails/post/',e
    );
  }

  GetOrderDetailsByRegimenDetails(regimenDetailsId : number){
    return this.http.get(
      'http://localhost:8081/orderDetails/get/regimenDetailsId/'+ regimenDetailsId
    );
  }
}
