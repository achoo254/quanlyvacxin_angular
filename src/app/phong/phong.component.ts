import { CustomerService } from 'src/app/service/Customer.service';
import { RoomService } from 'src/app/service/Room.service';
import { CustomerRoom } from 'src/app/obj/CustomerRoom';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { isLogin } from '../function/myFunction';
import { Room } from '../obj/Room';
import { UserInfo } from '../obj/UserInfo';
import { eVariables } from '../obj/variables';
import { UserInfoService } from '../service/UserInfo.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerRoomService } from '../service/CustomerRoom.service';

@Component({
  selector: 'app-phong',
  templateUrl: './phong.component.html',
  styleUrls: ['./phong.component.scss']
})
export class PhongComponent implements OnInit {
  listRoom : Room[] = [];
  room : Room;
  roomId : number;
  user : UserInfo = new UserInfo();
  modalRef: BsModalRef;
  modalRefEdit: BsModalRef;
  modalRefAdd: BsModalRef;
  modalRefCancel : BsModalRef;
  isAddEditForm : boolean;
  isSelected : string;
  listRoomName : string[] = [];
  btnName : string;
  constructor(private customerRoomService : CustomerRoomService, private modalService: BsModalService, private roomService : RoomService, private userInfoService: UserInfoService, private router : Router) { }

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
    this.roomService.GetAllRoom().subscribe((response : Room[]) => {
      if(response != null){
        this.listRoom = response;
        this.listRoom.sort(function (a, b) {
          return ('' + a.name).localeCompare(b.name);
        });
      }
    });
    //Đặt giá trị cho list tên phòng mặc định
    this.listRoomName.push(eVariables.phongtieptan);
    this.listRoomName.push(eVariables.phongkham);
    this.listRoomName.push(eVariables.phongthungan);
    this.listRoomName.push(eVariables.phongtiem);
  }

  OnOff_Room(roomId : number){
    this.listRoom.forEach((response)=>{
      if(response.roomId == roomId){
        this.room = new Room();
        this.room.roomId = roomId;
        this.room.name = response.name;
        this.room.code = response.code;
        this.room.listCustomerRoom = null;
        this.room.status = !response.status;
        this.roomService.PutRoom(roomId, this.room).subscribe();
        return
      }
    });
  }

  deleteRoom(roomId : number, template: TemplateRef<any>){
    if(roomId > 0){
      this.roomService.DeleteRoom(roomId).subscribe((check : boolean)=>{
        if(check){
          setTimeout(()=>{
          $('#dataTablePhong').load(window.location.href + "#dataTablePhong" );
          }, 2000);
        }else{
          this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-sm' });
          this.openCloseModalAutoSubmit(1);
        }
      });
    }
  }

  resetRoom(template: TemplateRef<any>){
    //Lấy token
    if(isLogin(this.user)){
      //Thực hiện xóa
      console.log(this.user.telephone);
      this.customerRoomService.DeleteAllCustomerRoom(this.user.token, this.user.telephone).subscribe((check : boolean)=>{
        if(check){
          this.modalRefCancel = this.modalService.show(template, { id: 3, class: 'modal-sm' });
          this.openCloseModalAutoSubmit(3);
        }
      });
    }
  }

  openCloseModalAutoSubmit(templateId : number){
    setTimeout(()=>{
      this.modalService.hide(templateId);
  }, 2000);
  }

  initAddEditRoom(roomId : number){
    this.isAddEditForm = true;
    //initEdit
    if(roomId > 0){
      this.btnName = 'Cập nhật';
      this.listRoom.forEach((response)=>{
        if(response.roomId == roomId){
          this.room = new Room();
          this.room.roomId = roomId;
          this.room.name = response.name;
          this.isSelected = response.name;
          this.room.code = response.code;
          this.room.listCustomerRoom = null;
          this.room.status = response.status;
          return
        }
      });
    }
    //initAdd
    else{
      this.btnName = 'Thêm mới';
      this.room = new Room();
      this.isSelected = this.listRoomName[0].toString();
    }
  }

  AddEditForm(roomId : number, editTemplate: TemplateRef<any>, addTemplate: TemplateRef<any>){
    //SubmitEdit
    if(roomId > 0){
      this.room.name = this.isSelected;
      this.roomService.PutRoom(roomId, this.room).subscribe((item : Room)=>{
        if(item != null){
          this.modalRefEdit = this.modalService.show(editTemplate, { id: 2, class: 'modal-sm' });
          this.openCloseModalAutoSubmit(2);
        }
      });
    }
    //SubmitAdd
    else{
      this.room.name = this.isSelected;
      this.roomService.PostRoom(this.room).subscribe((item : Room)=>{
        if(item != null){
          this.modalRefAdd = this.modalService.show(addTemplate, { id: 3, class: 'modal-sm' });
          this.openCloseModalAutoSubmit(3);
        }
      });
    }
  }
}
