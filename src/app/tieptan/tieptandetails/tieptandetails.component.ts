import { Md5 } from 'ts-md5/dist/md5';
import { Notify } from './../../obj/Notify';
import { Room } from './../../obj/Room';
import { CustomerService } from './../../service/Customer.service';
import { CustomerRoom } from './../../obj/CustomerRoom';
import { UserInfoService } from './../../service/UserInfo.service';
import { RoomService } from './../../service/Room.service';
import { UserInfo } from './../../obj/UserInfo';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { eVariables } from 'src/app/obj/variables';
import { CustomerRoomService } from 'src/app/service/CustomerRoom.service';
import { isLogin } from 'src/app/function/myFunction';
import { Customer } from 'src/app/obj/Customer';
import { NotifyService } from 'src/app/service/Notify.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
selector: 'app-tieptandetails',
templateUrl: './tieptandetails.component.html',
styleUrls: ['./tieptandetails.component.css']
})
export class TieptandetailsComponent implements OnInit {
  registerUser : UserInfo = new UserInfo();
  registerCustomer : Customer = new Customer();
  registerCustomerRoom : CustomerRoom = new CustomerRoom();
  user : UserInfo = new UserInfo();
  room : Room = new Room();
  notify : Notify;
  userInfoCustomerRoom : CustomerRoom;
  listNextRoom : Room[] = [];
  listCustomerRoom : CustomerRoom[] = [];
  isStatusRoom : boolean;
  nextRoomSeleted : number;
  id = this.routerId.snapshot.params.id;
  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  thongtinkhachhang : boolean;
  thongtindangnhap : string;
  constructor(private modalService: BsModalService, private notifyService : NotifyService, private customerService: CustomerService, private roomService : RoomService, private customerRoomService: CustomerRoomService, private userInfoService: UserInfoService, private router : Router, private routerId : ActivatedRoute) { }

  ngOnInit(): void {
      //Ki???m tra ????ng nh???p hay ch??a, n???u ???? ????ng nh???p th?? l???y th??ng tin
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
              this.ShowData();
            }
          });
        });
      }
  }

  ShowRegisterForm(template: TemplateRef<any>){
    this.modalRef3 = this.modalService.show(template, { id: 3, class: '' });
  }

  ShowTelephoneLogin(){
    if(this.registerUser.fullName != '' && this.registerUser.birthday != null && this.registerCustomer.contactPhone != ''){

    }
  }

  RegisterCustomer(){
    //Kh???i t???o m???i ?????i t?????ng kh??ch h??ng
    const dateNow = new Date().getTime();
    this.registerCustomer.customerUserInfo = new UserInfo();
    this.registerCustomerRoom.customerRoomCustomer = new Customer();
    this.registerCustomerRoom.customerRoomRoom = new Room();
    this.registerUser.telephone = this.registerCustomer.contactPhone+'_'+ dateNow;
    //Fake c??c th??ng tin c???a kh??ch h??ng
    this.registerUser.roles = eVariables.roles_khachhang;
    this.registerUser.email = this.registerCustomer.contactPhone + '@gmail.com';
    this.registerUser.password = '123';
    this.registerUser.status = true;
    //T???o token
    this.registerUser.token = this.registerUser.password;
    //T???o th??ng tin kh??ch h??ng trong b???ng userInfo
    this.userInfoService.PostUserInfo(this.registerUser).subscribe((response : UserInfo) => {
      if(response != null){
        //g??n gi?? tr??? userinfoId cho th??ng tin kh??ch h??ng v???a t???o
        this.registerCustomer.customerUserInfo.userInfoId = response.userInfoId;
        //T???o th??ng tin kh??ch h??ng trong b???ng customer
        this.customerService.PostCustomer(this.registerCustomer).subscribe((response : Customer) => {
          if(response != null){
            //g??n gi?? tr??? room cho th??ng tin customer v???a t???o
            this.registerCustomerRoom.customerRoomCustomer.customerId = response.customerId;
            //T???o c??c th??ng tin cho b???ng CustomerRoom
            this.registerCustomerRoom.status = eVariables.status_wait;
            this.registerCustomerRoom.customerRoomRoom.roomId = this.id;
            //L???y gi?? tr??? order by cho c???t OrderBy
            this.customerRoomService.GetOrderByById(this.room.roomId).subscribe((orderBy : any) => {
              if(orderBy != null){
                this.registerCustomerRoom.orderBy = orderBy;
                //Sau khi c?? ????? th??ng tin th?? c???p nh???t v??o b???ng CustomerRoom v?? reload trang
                this.customerRoomService.PostCustomerRoom(this.registerCustomerRoom).subscribe((customerRoom : any) => {
                  if(customerRoom != null){
                    setTimeout(() => {
                      $('#datatableTiepTan').load(window.location.href + "#datatableTiepTan" );
                    }, 2000);
                    this.thongtinkhachhang = true;
                    this.thongtindangnhap = this.registerUser.telephone;
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  ShowData(){
    //L???y th??ng tin room
    this.roomService.GetRoomById(this.id).subscribe((response : any) => {
      if(response != null){
        this.room = response;
        this.customerRoomService.GetAllCustomerRoomByRoomId(this.id).subscribe((response : CustomerRoom[]) => {
          if(response != null){
            response.forEach(item =>{
              this.listCustomerRoom.push(item);
            });
          }
        });
      }
    });
  }

  OnOff_Room(){
    if(this.room.status){
      this.room.status = false;
      this.roomService.PutRoom(this.id, this.room).subscribe((response : Room) => {
      });

    }
    else{
      this.room.status = true;
      this.roomService.PutRoom(this.id, this.room).subscribe((response : Room) => {
      });
    }
  }

  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }

  Welcome_Customer(item : CustomerRoom, template: TemplateRef<any>) {
    this.userInfoCustomerRoom = new CustomerRoom();
    if(item.status != eVariables.status_finish && item.customerRoomRoom.roomId == this.id){
      this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
      $('#a-next'+item.customerRoomId+'').attr('class', 'btn btn-info btn-icon-split btn-sm');
      $('#i-next'+item.customerRoomId+'').attr('class', 'fas fa-door-open');
      $('#span-next'+item.customerRoomId+'').text(eVariables.status_welcome);
      this.userInfoCustomerRoom = item;
      item.status = eVariables.status_welcome;
      this.customerRoomService.PutCustomerRoom(item.customerRoomId, item).subscribe((response) => {
      });
    }
  }

  Leave_Customer(){
    if(this.userInfoCustomerRoom.status != eVariables.status_finish){
      this.closeModal(1);
      $('#a-next'+this.userInfoCustomerRoom.customerRoomId+'').attr('class', 'btn btn-secondary btn-icon-split btn-sm');
      $('#i-next'+this.userInfoCustomerRoom.customerRoomId+'').attr('class', 'fas fa-chalkboard-teacher');
      $('#span-next'+this.userInfoCustomerRoom.customerRoomId+'').text(eVariables.status_cancel);
      this.userInfoCustomerRoom.status = eVariables.status_cancel;
      this.customerRoomService.PutCustomerRoom(this.userInfoCustomerRoom.customerRoomId, this.userInfoCustomerRoom).subscribe((response) => {
      });
    }
  }

  Open_NextRoom(template: TemplateRef<any>){
    this.modalRef2 = this.modalService.show(template, {id: 2, class: 'second' });
    //Close modal1
    this.closeModal(1);
    //Load ph??ng kh??m
    this.roomService.GetAllRoomByNameAndStatus(eVariables.phongkham, true).subscribe((response : Room[]) => {
      if(response != null){
        //g??n gi?? tr??? room m???i
        this.listNextRoom = response;
        //g??n m???c ?????nh ch???n ph??ng ?????u ti??n
        this.nextRoomSeleted = this.listNextRoom[0].roomId;
      }
    });
  }

  Next_Finish(){
    if(this.userInfoCustomerRoom.status != eVariables.status_finish){
      this.closeModal();
      $('#a-next'+this.userInfoCustomerRoom.customerRoomId+'').attr('class', 'btn btn-success btn-icon-split btn-sm');
      $('#i-next'+this.userInfoCustomerRoom.customerRoomId+'').attr('class', 'fas fa-clipboard-check');
      $('#span-next'+this.userInfoCustomerRoom.customerRoomId+'').text(eVariables.status_finish);
      $('#a-next'+this.userInfoCustomerRoom.customerRoomId+'').click(false);
      //Chuy???n kh??ch sang ph??ng ti???p theo
      this.userInfoCustomerRoom.status = eVariables.status_wait;
      //L???y gi?? tr??? order by cho c???t OrderBy
      this.customerRoomService.GetOrderByById(this.nextRoomSeleted).subscribe((orderBy : any) => {
        if(orderBy != null){
          this.userInfoCustomerRoom.orderBy = orderBy;
          this.userInfoCustomerRoom.customerRoomRoom = new Room();
          this.userInfoCustomerRoom.customerRoomRoom.roomId = this.nextRoomSeleted;

          this.customerRoomService.PutCustomerRoom(this.userInfoCustomerRoom.customerRoomId, this.userInfoCustomerRoom).subscribe((response) => {
          });
          //Th??m th??ng b??o
          this.notify = new Notify();
          this.notify.dates = new Date();
          var code = this.listNextRoom.find(x=>x.roomId == this.nextRoomSeleted).code;
          this.notify.details = this.user.roles + ' ' + this.user.fullName + eVariables.notify_move + eVariables.phongkham + ' ' + code;
          this.notify.notifyCustomer = this.userInfoCustomerRoom.customerRoomCustomer;
          this.notify.notifyRoom = this.userInfoCustomerRoom.customerRoomRoom;
          this.notifyService.PostNotify(this.notify).subscribe((response) => {
          });

        }
      });
    }
  }
}
