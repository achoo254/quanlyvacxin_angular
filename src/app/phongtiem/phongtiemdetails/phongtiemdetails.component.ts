import { ProductDetailsService } from './../../service/ProductDetails.service';
import { ProductDetails } from './../../obj/ProductDetails';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isLogin } from 'src/app/function/myFunction';
import { CustomerRoom } from 'src/app/obj/CustomerRoom';
import { RegimenDetails } from 'src/app/obj/RegimenDetails';
import { Room } from 'src/app/obj/Room';
import { UserInfo } from 'src/app/obj/UserInfo';
import { eVariables } from 'src/app/obj/variables';
import { CustomerRoomService } from 'src/app/service/CustomerRoom.service';
import { OrderDetailsService } from 'src/app/service/OrderDetails.service';
import { RegimenDetailsService } from 'src/app/service/RegimenDetails.service';
import { RoomService } from 'src/app/service/Room.service';
import { UserInfoService } from 'src/app/service/UserInfo.service';
import { Notify } from 'src/app/obj/Notify';
import { NotifyService } from 'src/app/service/Notify.service';

@Component({
  selector: 'app-phongtiemdetails',
  templateUrl: './phongtiemdetails.component.html',
  styleUrls: ['./phongtiemdetails.component.css']
})
export class PhongtiemdetailsComponent implements OnInit {
  user : UserInfo = new UserInfo();
  room : Room = new Room();
  userInfoCustomerRoom : CustomerRoom;
  listNextRoom : Room[] = [];
  listCustomerRoom : CustomerRoom[] = [];
  isStatusRoom : boolean;
  nextRoomSeleted : number;
  id = this.routerId.snapshot.params.id;//Room Id
  notify : Notify;
  //Biến riêng
  listProductDetails : ProductDetails[] = [];
  listRegimenDetails : RegimenDetails[] = [];
  isDaTiem : boolean;
  dateNow : Date = new Date();
  dateFormat = "yyyy-MM-dd";
  constructor(private notifyService : NotifyService, private datePipe : DatePipe, private orderDetailsService : OrderDetailsService, private regimenDetailsService: RegimenDetailsService, private roomService : RoomService, private customerRoomService: CustomerRoomService, private userInfoService: UserInfoService, private router : Router, private routerId : ActivatedRoute) { }

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
            this.ShowData();
          }
        });
      });
    }
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
//Lưu ý chung: Tất cả các thuộc tính đều phải thêm tham số ID
  /* hàm riêng */
  DaTiem(regimenDetailsId : number){

    this.listRegimenDetails.forEach(item =>{
      if(item.regimenDetailsId == regimenDetailsId && item.inject == false ){
        item.inject = true;
        this.regimenDetailsService.PutRegimenDetails(item.regimenDetailsId, item).subscribe((response) => {
          if(response != null){
            $('#a-datiem'+regimenDetailsId+'').attr('class', 'btn btn-success btn-icon-split btn-sm');
            $('#span-datiem'+regimenDetailsId+'').text(eVariables.status_finish);
          }
        });
      }
    });
  }
  /* end */
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
      //Code riêng để hiển thị thông tin sản phẩm cần tiêm cho khách hàng
      this.regimenDetailsService.GetAllRegimenDetailsByCustomer(item.customerRoomCustomer.customerId).subscribe((response : RegimenDetails[]) => {
        if(response != null){
          this.listProductDetails = [];
          this.listRegimenDetails = [];
          response.forEach((item : RegimenDetails)=>{
            if(item.dateInject.toString() == this.datePipe.transform(this.dateNow, this.dateFormat)){
              //Đánh dấu kiểm tra đã tồn tại trong bảng orderDetails chưa, nếu là true (đã thanh toán) thì mới cho tiêm
              this.orderDetailsService.GetOrderDetailsByRegimenDetails(item.regimenDetailsId).subscribe((response : boolean) => {
                if(response){
                  //Kiểm tra trạng thái đã tiêm chưa, nếu là false (chưa tiêm) mới cho tiêm
                  if(item.inject == false){
                    this.listProductDetails.push(item.regimenDetailsProductDetails);
                    this.listRegimenDetails.push(item);
                  }
              }
              });
            }
          });
        }
      });
    }
  }

  LichSuTiem(customerId: number){
    this.router.navigate(['/lichsutiem/'+customerId]);
  }

  Next_Finish(){
    if(this.userInfoCustomerRoom.status != eVariables.status_finish){
      $('.closeInfoCustomer').click();
      this.userInfoCustomerRoom.status = eVariables.status_finish;
      $('#a-next'+this.userInfoCustomerRoom.customerRoomId+'').attr('class', 'btn btn-success btn-icon-split btn-sm');
      $('#i-next'+this.userInfoCustomerRoom.customerRoomId+'').attr('class', 'fas fa-clipboard-check');
      $('#span-next'+this.userInfoCustomerRoom.customerRoomId+'').text(eVariables.status_finish);
      $('#a-next'+this.userInfoCustomerRoom.customerRoomId+'').click(false);

      this.customerRoomService.PutCustomerRoom(this.userInfoCustomerRoom.customerRoomId, this.userInfoCustomerRoom).subscribe((response) => {
      });
      //Thêm thông báo
      this.notify = new Notify();
      this.notify.dates = new Date();
      //Lấy tên phòng hiện tại
      this.roomService.GetRoomById(this.id).subscribe((response : Room) => {
        if(response != null){
          var code = response.code;
          this.notify.details = this.userInfoCustomerRoom.customerRoomCustomer.customerUserInfo.roles + ' ' + this.userInfoCustomerRoom.customerRoomCustomer.customerUserInfo.fullName + eVariables.notify_finish + eVariables.phongtiem + ' ' + code;
          this.notify.notifyCustomer = this.userInfoCustomerRoom.customerRoomCustomer;
          this.notify.notifyRoom = this.userInfoCustomerRoom.customerRoomRoom;
          this.notifyService.PostNotify(this.notify).subscribe((response) => {
          });
          //End
        }
      });
    }
  }
}
