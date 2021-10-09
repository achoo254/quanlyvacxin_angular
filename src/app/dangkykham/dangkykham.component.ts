import { RoomService } from './../service/Room.service';
import { CustomerRoomService } from './../service/CustomerRoom.service';
import { UserInfoService } from './../service/UserInfo.service';
import { CustomerService } from './../service/Customer.service';
import { CustomerRoom } from './../obj/CustomerRoom';
import { UserInfo } from './../obj/UserInfo';
import { eVariables } from 'src/app/obj/variables';
import { Room } from '../obj/Room';
import { Customer } from '../obj/Customer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dangkykham',
  templateUrl: './dangkykham.component.html',
  styleUrls: ['./dangkykham.component.css']
})
export class DangkykhamComponent implements OnInit {
  baseUrl : string = location.origin;
  user : UserInfo = new UserInfo();
  customer : Customer = new Customer();
  customerRoom : CustomerRoom = new CustomerRoom();
  room : Room = new Room();
  customerRoomStatus : string = eVariables.status_wait;
  customerRoomOrderBy : number;
  isValid : boolean;
  contactNameInvalid : boolean;
  contactPhoneInvalid : boolean;
  btnStatus = 'Đăng ký khám';
  constructor(private roomService: RoomService ,private customerService : CustomerService, private userInfoService : UserInfoService, private customerRoomService: CustomerRoomService, private router : Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('token') == null && localStorage.getItem('token') == null){
      this.router.navigate(['/dangnhap/']);
    }
    else if(sessionStorage.getItem('token') != null){
      this.user.token = sessionStorage.getItem('token');
      this.user.telephone = sessionStorage.getItem('telephone');
    }
    else if(localStorage.getItem('token') != null){
      this.user.token = localStorage.getItem('token');
      this.user.telephone = localStorage.getItem('telephone');
    }
    this.userInfoService.GetUserInfoByToken(this.user.token, this.user.telephone).subscribe((data :UserInfo) => {
      this.user = data;
    });
  }

  DangKyKham(){

  //Lấy thông tin khách hàng theo số điện thoại
  this.userInfoService.getUserInfoByTelephone(this.user.telephone).subscribe((isUser : boolean) => {
    if(isUser){
      //Đăng ký khám nên chỉ lấy Phòng tiếp tân đang active
      this.room.name = eVariables.phongtieptan;
      this.room.status = true;
      //Lấy thông tin Room đang active
      this.roomService.GetRoomByNameAndStatus(this.room.name, this.room.status).subscribe((room : any) => {
        if(room != null)
        {
          //Gắn giá trị cho đối tượng Room của CustomerRoom
          this.room = room;
          //Lấy giá trị order by cho cột OrderBy
          this.customerRoomService.GetOrderByById(this.room.roomId).subscribe((orderBy : any) => {
            if(orderBy != null){
              this.customerRoomOrderBy = orderBy;
            }
          });
          //Lấy thông tin customer theo UserInfo
          this.customerService.GetCustomerByUserInfo(this.user.userInfoId).subscribe((customer : any) => {
            //Nếu customerId không rỗng thì cập nhật
            if(customer != null){
              this.customerService.PutCustomer(customer.customerId, this.customer).subscribe((putCustomer : any) => {
                if(putCustomer != null){
                  //Gắn giá trị cho đối tượng Customer sau khi thêm mới của CustomerRoom
                  this.customer = putCustomer;
                  //Gắn giá trị customerId trong bảng CustomerRoom
                  this.customerRoom.customerRoomCustomer = new Customer();
                  this.customerRoom.customerRoomCustomer.customerId = this.customer.customerId;
                  //Gắn giá trị roomId trong bảng Customer
                  this.customerRoom.customerRoomRoom = new Room();
                  this.customerRoom.customerRoomRoom.roomId = this.room.roomId;
                  //Gán giá trị status trong bảng Customer
                  this.customerRoom.status = this.customerRoomStatus;
                  //Gán giá trị order by trong bảng Customer
                  this.customerRoom.orderBy = this.customerRoomOrderBy;
                  //Cập nhật CSDL bảng CustomerRoom
                  this.customerRoomService.PostCustomerRoom(this.customerRoom).subscribe((customerRoom : any) => {
                    if(customerRoom != null){
                      this.isValid = true;
                      this.btnStatus = 'Đăng ký khám thành công, tiếp tân sẽ liên hệ với quý vị để phục vụ';
                    }
                  });
                }
              });
            }
            //Ngược lại thì add mới trong bảng customer
            else{
              this.customer.customerUserInfo = new UserInfo();
              this.customer.customerUserInfo.userInfoId = this.user.userInfoId;
              //Cập nhật CSDL bảng Customer
              this.customerService.PostCustomer(this.customer).subscribe((postCustomer : any) => {
                if(postCustomer != null){
                  //Gắn giá trị cho đối tượng Customer sau khi thêm mới của CustomerRoom
                  this.customer = postCustomer;
                  //Gắn giá trị customerId trong bảng CustomerRoom
                  this.customerRoom.customerRoomCustomer = new Customer();
                  this.customerRoom.customerRoomCustomer.customerId = this.customer.customerId;
                  //Gắn giá trị roomId trong bảng Customer
                  this.customerRoom.customerRoomRoom = new Room();
                  this.customerRoom.customerRoomRoom.roomId = this.room.roomId;
                  //Gán giá trị status trong bảng Customer
                  this.customerRoom.status = this.customerRoomStatus;
                  //Gán giá trị order by trong bảng Customer
                  this.customerRoom.orderBy = this.customerRoomOrderBy;
                  //Cập nhật CSDL bảng CustomerRoom
                  this.customerRoomService.PostCustomerRoom(this.customerRoom).subscribe((customerRoom : any) => {
                    if(customerRoom != null){
                      this.isValid = true;
                      this.btnStatus = 'Đăng ký khám thành công, tiếp tân sẽ liên hệ với quý vị để phục vụ';
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
  }
}
