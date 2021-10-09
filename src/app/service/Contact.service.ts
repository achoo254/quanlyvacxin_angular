import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

constructor(private http: HttpClient) { }
  PostContact(e){
    return this.http.post(
      'http://localhost:8081/contact/post/',e
    );
  }
}
