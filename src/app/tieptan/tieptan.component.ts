import { isLogin } from 'src/app/function/myFunction';
import { UserInfoService } from './../service/UserInfo.service';
import { RoomService } from './../service/Room.service';
import { UserInfo } from './../obj/UserInfo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../obj/Room';
import { eVariables } from '../obj/variables';


@Component({
  selector: 'app-tieptan',
  templateUrl: './tieptan.component.html',
  styleUrls: ['./tieptan.component.css']
})
export class TieptanComponent implements OnInit {
  user : UserInfo = new UserInfo();
  listRoom : Room[];

  constructor(private service : RoomService, private userInfoService : UserInfoService, private router : Router) { }

  ngOnInit(): void {
    //Kiểm tra đăng nhập hay chưa, nếu đã đăng nhập thì lấy thông tin
    if(!isLogin(this.user)){
      this.router.navigate(['/dangnhap/']);
    }
    else{
      this.userInfoService.GetUserInfoByToken(this.user.token, this.user.telephone).subscribe((data :UserInfo) => {
        this.user.roles = data.roles;

        this.userInfoService.getUserInfoByTokenAndRoles(this.user.token, eVariables.roles_tieptan, this.user.telephone).subscribe((response : boolean) => {
          if(!response && this.user.roles != eVariables.roles_quanly && this.user.roles != eVariables.roles_quantri){
            this.router.navigate(['/trangloi']);
          }
          else{
            this.service.GetAllRoomByNameAndStatus(eVariables.phongtieptan, true).subscribe((response : any) => {
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
