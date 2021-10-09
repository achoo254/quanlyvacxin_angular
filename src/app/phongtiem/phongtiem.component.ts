import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isLogin } from '../function/myFunction';
import { Room } from '../obj/Room';
import { UserInfo } from '../obj/UserInfo';
import { eVariables } from '../obj/variables';
import { RoomService } from '../service/Room.service';
import { UserInfoService } from '../service/UserInfo.service';

@Component({
  selector: 'app-phongtiem',
  templateUrl: './phongtiem.component.html',
  styleUrls: ['./phongtiem.component.css']
})
export class PhongtiemComponent implements OnInit {
  user : UserInfo = new UserInfo();
  listRoom : Room[] = [];
  constructor(private service : RoomService, private userInfoService : UserInfoService, private router : Router) { }

  ngOnInit(): void {
    //Kiểm tra đăng nhập hay chưa, nếu đã đăng nhập thì lấy thông tin
    if(!isLogin(this.user)){
      this.router.navigate(['/dangnhap/']);
    }
    else{
      this.userInfoService.GetUserInfoByToken(this.user.token, this.user.telephone).subscribe((data :UserInfo) => {
        this.user.roles = data.roles;

        this.userInfoService.getUserInfoByTokenAndRoles(this.user.token, eVariables.roles_dieuduong, this.user.telephone).subscribe((response : boolean) => {
          if(!response && this.user.roles != eVariables.roles_quanly && this.user.roles != eVariables.roles_quantri){
            this.router.navigate(['/trangloi']);
          }
          else{
            this.service.GetAllRoomByNameAndStatus(eVariables.phongtiem, true).subscribe((response : any) => {
              if(response != null){
                this.listRoom = response;
              }
              console.log(response);
            });
          }
        });
      });
    }
  }
}
