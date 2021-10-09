import { ProductDetails } from './../obj/ProductDetails';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

constructor(private http: HttpClient) { }
  GetAllProductDetails(){
    return this.http.get(
      'http://localhost:8081/productDetails/getAll/'
    );
  }

  GetProductDetailsById(productDetailsId : number){
    return this.http.get(
      'http://localhost:8081/productDetails/get/'+ productDetailsId
    );
  }

  GetAllProductDetailsByCategories(categoriesId : number){
    return this.http.get(
      'http://localhost:8081/productDetails/getAll/categoriesId/'+ categoriesId
    );
  }

  PutProductDetails(productDetailsId : number, productDetails : ProductDetails){
    return this.http.put(
      'http://localhost:8081/productDetails/put/'+productDetailsId+'',productDetails
    );
  }

  PostProductDetails(e){
    return this.http.post(
      'http://localhost:8081/productDetails/post/' , e
    );
  }

  DeleteProductDetails(productDetailsId : number){
    return this.http.delete(
      'http://localhost:8081/productDetails/delete/' + productDetailsId
    );
  }
}
