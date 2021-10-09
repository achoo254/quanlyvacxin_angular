import { NgForm } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/obj/UserInfo';
import { UserInfoService } from 'src/app/service/UserInfo.service';
import { isLogin } from 'src/app/function/myFunction';

@Component({
  selector: 'app-doimatkhau',
  templateUrl: './doimatkhau.component.html',
  styleUrls: ['./doimatkhau.component.scss']
})
export class DoimatkhauComponent implements OnInit {
  user: UserInfo = new UserInfo();
  passwordNew : string;
  wrongPassword : boolean;
  isValid : boolean;
  constructor(private userInfoService: UserInfoService, private router: Router) { }

  ngOnInit() {
    //Kiểm tra đăng nhập hay chưa, nếu đã đăng nhập thì về trang chính
    if(!isLogin(this.user)){
      this.router.navigate(['/']);
    }else{
      this.userInfoService.GetUserInfoByToken(this.user.token, this.user.telephone).subscribe((data :UserInfo) => {
        this.user = data;
      });
    }
  }

  PutPassword(password : string, passwordNew : string){
    //Mã hóa mật khẩu cũ để kiểm tra mật khẩu cũ giống không, nếu giống thì cho phép đổi
    let token = password;
    this.userInfoService.GetUserInfoByToken(token, this.user.telephone).subscribe((data :UserInfo) => {
      if(data == null){
        this.wrongPassword = true;
        this.isValid = false;
      }
      else{
        this.wrongPassword = false;
        this.user.password = passwordNew;
        this.user.token = passwordNew;
        this.userInfoService.PutPassword(this.user.userInfoId, this.user).subscribe((item :UserInfo) => {
          if(item != null){
            this.isValid = true;
            if(localStorage.getItem('token') != null){
              localStorage.removeItem('token');
              localStorage.setItem('token', this.user.token);
              localStorage.removeItem('telephone');
              localStorage.setItem('telephone', this.user.telephone);
            }
            else{
              sessionStorage.removeItem('token');
              sessionStorage.setItem('token', this.user.token);
              sessionStorage.removeItem('telephone');
              sessionStorage.setItem('telephone', this.user.telephone);
            }
          }
          else{
            this.isValid = false;
          }
        });
      }
    });
  }

}
