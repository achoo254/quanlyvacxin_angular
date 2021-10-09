import { UserInfoService } from './../service/UserInfo.service';
import { UserInfo } from './../obj/UserInfo';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { isLogin } from '../function/myFunction';
import { eVariables } from '../obj/variables';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-nhanvien',
  templateUrl: './nhanvien.component.html',
  styleUrls: ['./nhanvien.component.scss']
})
export class NhanvienComponent implements OnInit {
  listUserInfo : UserInfo[] = [];
  user : UserInfo = new UserInfo();
  initUser : UserInfo = new UserInfo();
  modalRefEdit: BsModalRef;
  isAddEditForm : boolean;
  isSelected : string;
  listRoles : string[] = [];
  constructor(private modalService: BsModalService, private userInfoService : UserInfoService, private router : Router) { }

  ngOnInit() {
    //Kiểm tra đăng nhập hay chưa, nếu đã đăng nhập thì lấy thông tin
    if(!isLogin(this.user)){
      this.router.navigate(['/dangnhap/']);
    }
    else{
      this.userInfoService.GetUserInfoByToken(this.user.token, this.user.telephone).subscribe((data :UserInfo) => {
        this.user = data;
        if(this.user.roles != eVariables.roles_quanly && this.user.roles != eVariables.roles_quantri){
          this.router.navigate(['/trangloi']);
        }
        else{
          this.ShowData();
        }
      });
    }
  }

  ShowData(){
    //Lấy thông tin sản phẩm và tồn kho
    this.userInfoService.getAllUserInfo().subscribe((response : UserInfo[]) => {
      if(response != null){
        response.forEach(item=>{
          if(item.roles != eVariables.roles_khachhang && item.roles != eVariables.roles_quantri){
            this.listUserInfo.push(item);
          }
        });
      }
    });
    //Đặt giá trị cho list tên phòng mặc định
    this.listRoles.push(eVariables.roles_bacsi);
    this.listRoles.push(eVariables.roles_dieuduong);
    this.listRoles.push(eVariables.roles_thungan);
    this.listRoles.push(eVariables.roles_tieptan);
  }

  openCloseModalAutoSubmit(templateId : number){
    setTimeout(()=>{
      this.modalService.hide(templateId);
  }, 2000);
  }

  initAddEditForm(userInfoId : number){
    if(userInfoId > 0){
      this.isAddEditForm = true;
      this.listUserInfo.forEach(item =>{
        if(item.userInfoId == userInfoId){
          this.initUser = item;
          this.isSelected = item.roles;
          return
        }
      });
    }
  }

  AddEditForm(userInfoId : number, editTemplate: TemplateRef<any>){
    if(userInfoId > 0){
      this.initUser.roles = this.isSelected;
      this.userInfoService.PutRoles(userInfoId, this.initUser).subscribe((item : UserInfo)=>{
        if(item != null){
          this.modalRefEdit = this.modalService.show(editTemplate, { id: 1, class: 'modal-sm' });
          this.openCloseModalAutoSubmit(1);
        }
      });
    }
  }
}
