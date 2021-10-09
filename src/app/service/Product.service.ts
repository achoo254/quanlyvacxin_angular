import { Product } from './../obj/Product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http: HttpClient) { }
  GetAllProduct(){
    return this.http.get(
      'http://localhost:8081/product/getAll/'
    );
  }

  GetProductById(id: number){
    return this.http.get(
      'http://localhost:8081/product/get/' + id
    );
  }

  PostProduct(e){
    return this.http.post(
      'http://localhost:8081/product/post/' , e
    );
  }

  PutProduct(productId : number, product: Product){
    return this.http.put(
      'http://localhost:8081/product/put/' + productId , product
    );
  }
}
