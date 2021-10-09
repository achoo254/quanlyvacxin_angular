import { OrderDetails } from './../../obj/OrderDetails';
import { Orders } from './../../obj/Orders';
import { OrderDetailsService } from './../../service/OrderDetails.service';
import { OrdersService } from './../../service/Orders.service';
import { RegimenDetails } from './../../obj/RegimenDetails';
import { RegimenDetailsService } from './../../service/RegimenDetails.service';
import { Customer } from './../../obj/Customer';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isLogin } from 'src/app/function/myFunction';
import { CustomerRoom } from 'src/app/obj/CustomerRoom';
import { Room } from 'src/app/obj/Room';
import { UserInfo } from 'src/app/obj/UserInfo';
import { eVariables } from 'src/app/obj/variables';
import { CustomerService } from 'src/app/service/Customer.service';
import { CustomerRoomService } from 'src/app/service/CustomerRoom.service';
import { RoomService } from 'src/app/service/Room.service';
import { UserInfoService } from 'src/app/service/UserInfo.service';
import { ProductDetails } from 'src/app/obj/ProductDetails';
import { DatePipe } from '@angular/common';
import { NotifyService } from 'src/app/service/Notify.service';
import { Notify } from 'src/app/obj/Notify';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
declare var $ :any;
@Component({
  selector: 'app-thungandetails',
  templateUrl: './thungandetails.component.html',
  styleUrls: ['./thungandetails.component.css']
})
export class ThungandetailsComponent implements OnInit {
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
  orders : Orders;
  orderDetails : OrderDetails;
  listRegimenDetails : RegimenDetails[] = [];
  ThanhTien : number;
  Total : number;
  isThanhToan : boolean;
  dateNow : Date = new Date();
  dateFormat = "yyyy-MM-dd";
  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  constructor(private modalService: BsModalService, private notifyService : NotifyService, private datePipe : DatePipe, private orderDetailsService : OrderDetailsService, private ordersService : OrdersService, private regimenDetailsService: RegimenDetailsService, private roomService : RoomService, private customerRoomService: CustomerRoomService, private userInfoService: UserInfoService, private router : Router, private routerId : ActivatedRoute) { }

  ngOnInit(): void {
     //Kiểm tra đăng nhập hay chưa, nếu đã đăng nhập thì lấy thông tin
     if(!isLogin(this.user)){
      this.router.navigate(['/dangnhap/']);
    }
    else{
      this.userInfoService.GetUserInfoByToken(this.user.token, this.user.telephone).subscribe((data :UserInfo) => {
        this.user.roles = data.roles;

        this.userInfoService.getUserInfoByTokenAndRoles(this.user.token, eVariables.roles_thungan, this.user.telephone).subscribe((response : boolean) => {
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
    console.log(this.id);
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

  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }

  /* hàm riêng */
  ThanhToan(customer : Customer){
    //Thêm vào bảng Orders trước
    this.orders = new Orders();
    this.orders.datePrinted = new Date();
    this.orders.total = this.Total;
    this.ordersService.PostOrders(this.orders).subscribe((response : Orders) => {
      if(response != null){
        this.listRegimenDetails.forEach((item : RegimenDetails) =>{
          if(item.regimenDetailsCustomer.customerId == customer.customerId){
            this.orderDetails = new OrderDetails();
            this.orderDetails.orderDetailsOrder = response;
            this.orderDetails.orderDetailsRegimenDetails = item;
            this.orderDetails.price = item.regimenDetailsProductDetails.productDetailsProduct.sell;
            this.orderDetails.quantity = item.quantity;
            //Thêm vào bảng OrderDetails theo từng sản phẩm
            this.orderDetailsService.PostOrderDetails(this.orderDetails).subscribe((response : Orders) => {});
          }
        });
        //Đánh dấu
        this.isThanhToan = true;
      }
    });
  }
  /* end */
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
      //Code riêng để hiển thị thông tin sản phẩm cần thanh toán của khách hàng
      this.regimenDetailsService.GetAllRegimenDetailsByCustomer(item.customerRoomCustomer.customerId).subscribe((response : RegimenDetails[]) => {
        if(response != null){
          this.listRegimenDetails = [];
          this.ThanhTien = 0;
          this.Total = 0;
          this.isThanhToan = false;
          response.forEach((item : RegimenDetails)=>{
            if(item.dateInject.toString() == this.datePipe.transform(this.dateNow, this.dateFormat)){
              //Đánh dấu kiểm tra đã tồn tại trong bảng orderDetails chưa, nếu có thì không hiển thị thanh toán
              this.orderDetailsService.GetOrderDetailsByRegimenDetails(item.regimenDetailsId).subscribe((response : boolean) => {
                if(!response){
                  this.listRegimenDetails.push(item);
                  this.ThanhTien = item.regimenDetailsProductDetails.productDetailsProduct.sell * item.quantity;
                  this.Total += this.ThanhTien;
              }
              });
            }
          });
        }
      });
    }
  }
  Open_NextRoom(template: TemplateRef<any>){
    this.modalRef2 = this.modalService.show(template, {id: 2, class: 'second' });
    //Close modal1
    this.closeModal(1);
    //Load phòng tiếp theo
    this.roomService.GetAllRoomByNameAndStatus(eVariables.phongtiem, true).subscribe((response : Room[]) => {
      if(response != null){
        //gán giá trị room mới
        this.listNextRoom = response;
        //gán mặc định chọn phòng đầu tiên
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

          //Thêm thông báo
          this.notify = new Notify();
          this.notify.dates = new Date();
          var code = this.listNextRoom.find(x=>x.roomId == this.nextRoomSeleted).code;
          this.notify.details = this.user.roles + ' ' + this.user.fullName + eVariables.notify_move + eVariables.phongtiem + ' ' + code;
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
