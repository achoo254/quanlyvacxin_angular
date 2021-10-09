import { UserInfo } from './../obj/UserInfo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

constructor(private http: HttpClient) { }
  getAllUserInfo(){
    return this.http.get(
      'http://localhost:8081/userInfo/getAll/'
    );
  }

  PostUserInfo(e){
    return this.http.post(
      'http://localhost:8081/userInfo/post/',e
    );
  }

  PutUserInfo(userInfoId : number, userInfo : UserInfo){
    return this.http.put(
      'http://localhost:8081/userInfo/put/'+ userInfoId, userInfo
    );
  }

  PutPassword(userInfoId : number, userInfo : UserInfo){
    return this.http.put(
      'http://localhost:8081/userInfo/put/password/'+ userInfoId, userInfo
    );
  }

  PutRoles(userInfoId : number, userInfo : UserInfo){
    return this.http.put(
      'http://localhost:8081/userInfo/put/roles/'+ userInfoId, userInfo
    );
  }

  GetUserInfoByToken(token: string, telephone: string){
    return this.http.get(
      'http://localhost:8081/userInfo/get/token/'+token+'/'+telephone
    );
  }

  getUserInfoByEmail(email: string){
    return this.http.get(
      'http://localhost:8081/userInfo/get/email/' + email
    );
  }

  getUserInfoByTelephone(telephone: string){
    return this.http.get(
      'http://localhost:8081/userInfo/get/telephone/' + telephone
    );
  }

  getUserInfoById(id: number){
    return this.http.get(
      'http://localhost:8081/userInfo/get/' + id
    );
  }

  getUserInfoByTokenAndRoles(token: string, roles: string, telephone : string){
    return this.http.get(
      'http://localhost:8081/userInfo/get/token/' + token + '/roles/' + roles + '/' + telephone
    );
  }
}
