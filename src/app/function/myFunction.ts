import { UserInfo } from './../obj/UserInfo';
import { eVariables } from 'src/app/obj/variables';

export function isLogin(user: UserInfo){
  let check = true;
  if(localStorage.getItem('token') != null){
    user.token = localStorage.getItem('token');
    user.telephone = localStorage.getItem('telephone');
  }
  else if(sessionStorage.getItem('token') != null){
    user.token = sessionStorage.getItem('token');
    user.telephone = sessionStorage.getItem('telephone');
  }
  else{
    check = false;
  }
  return check;
}


