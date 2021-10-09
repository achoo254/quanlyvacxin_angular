import { RegimenDetailsService } from './../service/RegimenDetails.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegimenDetails } from '../obj/RegimenDetails';
import {Location} from '@angular/common';
import { isLogin } from '../function/myFunction';
import { UserInfo } from '../obj/UserInfo';
import { eVariables } from '../obj/variables';
import { UserInfoService } from '../service/UserInfo.service';

@Component({
  selector: 'app-lichsutiem',
  templateUrl: './lichsutiem.component.html',
  styleUrls: ['./lichsutiem.component.css']
})
export class LichsutiemComponent implements OnInit {
  id = this.routerId.snapshot.params.id;
  user : UserInfo = new UserInfo();
  listRegimenDetails : RegimenDetails[] = [];

  constructor(private userInfoService: UserInfoService, private regimenDetailsService: RegimenDetailsService, private router : Router, private routerId : ActivatedRoute, private location : Location) {
    this.location = location;
   }



  ngOnInit(): void {
    //Kiểm tra đăng nhập hay chưa, nếu đã đăng nhập thì lấy thông tin
    if(!isLogin(this.user)){
      this.router.navigate(['/dangnhap/']);
    }
    else{
      this.userInfoService.GetUserInfoByToken(this.user.token, this.user.telephone).subscribe((data :UserInfo) => {
        this.user = data;
        if(this.user.roles != eVariables.roles_dieuduong && this.user.roles != eVariables.roles_bacsi && this.user.roles != eVariables.roles_quanly && this.user.roles != eVariables.roles_quantri && this.user.roles != eVariables.roles_khachhang){
          this.router.navigate(['/trangloi']);
        }
        else{
          this.ShowData();
        }
      });
    }
  }

  ShowData(){
    //Lấy thông tin room
    this.regimenDetailsService.GetAllRegimenDetailsByCustomer(this.id).subscribe((response : any) => {
      if(response != null){
        this.listRegimenDetails = response;
      }
    });
  }

  GoBack(){
    if (window.history.length > 1) {
      this.location.back();
      setTimeout(() => {
        window.location.reload();
    }, 2000);  //5s
  } else {
      this.router.navigate(['/']);
  }
  }
}
