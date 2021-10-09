import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../obj/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

constructor(private http: HttpClient) { }
  GetRoomByNameAndStatus(name: string, status : boolean){
    return this.http.get(
      'http://localhost:8081/room/get/name/' + name + '/status/' + status
    );
  }

  GetRoomById(roomId : number){
    return this.http.get(
      'http://localhost:8081/room/get/' + roomId
    );
  }

  PutRoom(roomId : number, room : Room){
    return this.http.put(
      'http://localhost:8081/room/put/' + roomId,room
    );
  }

  PostRoom(room : Room){
    return this.http.post(
      'http://localhost:8081/room/post/' ,room
    );
  }

  DeleteRoom(roomId : number){
    return this.http.delete(
      'http://localhost:8081/room/delete/' + roomId
    );
  }

  GetAllRoom(){
    return this.http.get(
      'http://localhost:8081/room/getAll/'
    );
  }

  GetAllRoomByNameAndStatus(name: string, status : boolean){
    return this.http.get(
      'http://localhost:8081/room/getAll/name/' + name + '/status/' + status
    );
  }
}
