import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notify } from '../obj/Notify';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

constructor(private http: HttpClient) { }
  PostNotify(e){
    return this.http.post(
      'http://localhost:8081/notify/post/',e
    );
  }

  PutNotify(notifyId : number, notify : Notify){
    return this.http.put(
      'http://localhost:8081/notify/put/'+notifyId+'',notify
    );
  }
}
