import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

constructor(private http: HttpClient) { }
  GetAllCategories(){
    return this.http.get(
      'http://localhost:8081/categories/getAll/'
    );
  }

  GetCategoriesById(id: number) {
    return this.http.get(
      'http://localhost:8081/categories/get/'+id
    );
  }
}
