import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isLogin } from 'src/app/function/myFunction';
import { Customer } from 'src/app/obj/Customer';
import { CustomerRoom } from 'src/app/obj/CustomerRoom';
import { Room } from 'src/app/obj/Room';
import { UserInfo } from 'src/app/obj/UserInfo';
import { eVariables } from 'src/app/obj/variables';
import { CustomerService } from 'src/app/service/Customer.service';
import { CustomerRoomService } from 'src/app/service/CustomerRoom.service';
import { RoomService } from 'src/app/service/Room.service';
import { UserInfoService } from 'src/app/service/UserInfo.service';

@Component({
  selector: 'app-phongkhamdetails',
  templateUrl: './phongkhamdetails.component.html',
  styleUrls: ['./phongkhamdetails.component.css']
})
export class PhongkhamdetailsComponent implements OnInit {
  registerUser : UserInfo = new UserInfo();
  registerCustomer : Customer = new Customer();
  registerCustomerRoom : CustomerRoom = new CustomerRoom();
  user : UserInfo = new UserInfo();
  room : Room = new Room();
  userInfoCustomerRoom : CustomerRoom;
  listNextRoom : Room[] = [];
  listCustomerRoom : CustomerRoom[] = [];
  isStatusRoom : boolean;
  nextRoomSeleted : number;
  id = this.routerId.snapshot.params.id; //RoomId

  constructor(private customerService: CustomerService, private roomService : RoomService, private customerRoomService: CustomerRoomService, private userInfoService: UserInfoService, private router : Router, private routerId : ActivatedRoute) { }

  ngOnInit(): void {
    //Kiểm tra đăng nhập hay chưa, nếu đã đăng nhập thì lấy thông tin
    if(!isLogin(this.user)){
      this.router.navigate(['/dangnhap/']);
    }
    else{
      this.userInfoService.GetUserInfoByToken(this.user.token, this.user.telephone).subscribe((data :UserInfo) => {
        this.user.roles = data.roles;

        this.userInfoService.getUserInfoByTokenAndRoles(this.user.token, eVariables.roles_bacsi, this.user.telephone).subscribe((response : boolean) => {
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

  LichSuTiem(customerId: number){
    this.router.navigate(['/lichsutiem/'+customerId]);
  }

  DangKyTiem(customerId: number){
    this.router.navigate(['/dangkytiem/'+customerId]);
  }

  ShowData(){
    //Lấy thông tin room
    this.roomService.GetRoomById(this.id).subscribe((response : any) => {
      if(response != null){
        this.room = response;
        this.customerRoomService.GetAllCustomerRoomByRoomId(this.id).subscribe((response : CustomerRoom[]) => {
          response.forEach(item =>{
            this.listCustomerRoom.push(item);
          })
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

  Welcome_Customer(item : CustomerRoom) {
    this.userInfoCustomerRoom = new CustomerRoom();
    if(item.status != eVariables.status_finish && item.customerRoomRoom.roomId == this.id){
      $('#a-next'+item.customerRoomId+'').attr('class', 'btn btn-info btn-icon-split btn-sm');
      $('#a-next'+item.customerRoomId+'').attr('data-toggle', 'modal');
      $('#a-next'+item.customerRoomId+'').attr('data-target', '.thongtinkhachhang-modal-lg');
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
      $('#a-next'+this.userInfoCustomerRoom.customerRoomId+'').attr('class', 'btn btn-secondary btn-icon-split btn-sm');
      $('#i-next'+this.userInfoCustomerRoom.customerRoomId+'').attr('class', 'fas fa-chalkboard-teacher');
      $('#span-next'+this.userInfoCustomerRoom.customerRoomId+'').text(eVariables.status_cancel);
      this.userInfoCustomerRoom.status = eVariables.status_cancel;
      this.customerRoomService.PutCustomerRoom(this.userInfoCustomerRoom.customerRoomId, this.userInfoCustomerRoom).subscribe((response) => {
      });
    }
  }

  Open_NextRoom(){
    //Load phòng khám
    this.roomService.GetAllRoomByNameAndStatus(eVariables.phongthungan, true).subscribe((response : Room[]) => {
      if(response != null){
        //gán giá trị room mới
        this.listNextRoom = response;
        //gán mặc định chọn phòng đầu tiên
        this.nextRoomSeleted = this.listNextRoom[0].roomId;
        $('.chuyentiep').attr('data-toggle', 'modal');
        $('.chuyentiep').attr('data-target', '.chuyenphong-modal');
        $('.chuyentiep').click();
      }
    });
  }

  Next_Finish(){
    if(this.userInfoCustomerRoom.status != eVariables.status_finish){
      $('.closeInfoCustomer').click();
      $('.closeChuyenPhong').click();
      $('#a-next'+this.userInfoCustomerRoom.customerRoomId+'').attr('class', 'btn btn-success btn-icon-split btn-sm');
      $('#i-next'+this.userInfoCustomerRoom.customerRoomId+'').attr('class', 'fas fa-clipboard-check');
      $('#span-next'+this.userInfoCustomerRoom.customerRoomId+'').text(eVariables.status_finish);
      $('#a-next'+this.userInfoCustomerRoom.customerRoomId+'').click(false);
      //Chuyển khách sang phòng tiếp theo
      this.userInfoCustomerRoom.status = eVariables.status_wait;
      //Lấy giá trị order by cho cột OrderBy
      this.customerRoomService.GetOrderByById(this.nextRoomSeleted).subscribe((orderBy : any) => {
        if(orderBy != null){
          this.userInfoCustomerRoom.orderBy = orderBy;
          this.userInfoCustomerRoom.customerRoomRoom = new Room();
          this.userInfoCustomerRoom.customerRoomRoom.roomId = this.nextRoomSeleted;

          this.customerRoomService.PutCustomerRoom(this.userInfoCustomerRoom.customerRoomId, this.userInfoCustomerRoom).subscribe((response) => {
          });
        }
      });
    }
  }
}
