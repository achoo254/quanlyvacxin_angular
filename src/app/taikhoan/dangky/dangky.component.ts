import { Md5 } from 'ts-md5/dist/md5';
import { UserInfoService } from './../../service/UserInfo.service';
import { UserInfo } from './../../obj/UserInfo';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { eVariables } from 'src/app/obj/variables';
import { isLogin } from 'src/app/function/myFunction';


@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.css']
})
export class DangkyComponent implements OnInit {
  user: UserInfo = new UserInfo();
  matchPassword : boolean = true;
  existTelephone = false;
  existEmail = false;
  isValid : boolean;
  password : string;

  constructor(private service: UserInfoService, private router: Router) { }

  ngOnInit(): void {
    //Kiểm tra đăng nhập hay chưa, nếu đã đăng nhập thì về trang chính
    if(isLogin(this.user)){
      this.router.navigate(['/']);
    }
  }

  Register(fullName : string, telephone : string, email : string, password : string, repassword : string){
    //Kiểm tra xác nhận mật khẩu đúng hay không
    if(password == repassword){
      this.matchPassword = true;
    }
    else{
      this.matchPassword = false;
    }
    //Kiểm tra tồn tại telephone
    this.service.getUserInfoByTelephone(telephone).subscribe((response : boolean) => {
      this.existTelephone = response;
      if(!this.existTelephone){
        //Kiểm tra tồn tại email
        this.service.getUserInfoByEmail(email).subscribe((response : boolean) => {
          this.existEmail = response;
          if(!this.existEmail){
            //Đầu vào hợp lệ thì insert
            if(this.matchPassword == true && this.existTelephone == false && this.existEmail == false){
              this.isValid = true;
              //Set thông tin đăng ký
              this.user.fullName = fullName;
              this.user.telephone = telephone;
              this.user.email = email;
              //Set giá trị mặc định roles
              this.user.roles = eVariables.roles_khachhang;
              //Set trạng thái mặc định
              this.user.status = true;
              //Mã hóa mật khẩu
              this.user.password = password;
              //Tạo token
              this.user.token = this.user.password;
              //end
              $('#register').text('Đang xử lý...');
              this.service.PostUserInfo(this.user).subscribe((response) => {
                $('#register').text('Đăng ký thành công, đang chuyển tiếp...');
                setTimeout(() => {
                  this.router.navigate(['/dangnhap']);
              }, 5000);  //5s
              });
            }
          }
        });
      }
    });
  }
}
