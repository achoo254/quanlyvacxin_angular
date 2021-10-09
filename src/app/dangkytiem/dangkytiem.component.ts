import { RegimenDetails } from './../obj/RegimenDetails';
import { RegimenDetailsService } from './../service/RegimenDetails.service';
import { CustomerRoom } from './../obj/CustomerRoom';
import { ProductDetailsService } from './../service/ProductDetails.service';
import { CustomerRoomService } from 'src/app/service/CustomerRoom.service';
import { RoomService } from './../service/Room.service';
import { ProductDetails } from './../obj/ProductDetails';
import { CategoriesService } from './../service/Categories.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isLogin } from '../function/myFunction';
import { UserInfo } from '../obj/UserInfo';
import { eVariables } from '../obj/variables';
import { UserInfoService } from '../service/UserInfo.service';
import {DatePipe, Location} from '@angular/common';
import { Room } from '../obj/Room';
import { Customer } from '../obj/Customer';
import { Notify } from '../obj/Notify';
import { NotifyService } from '../service/Notify.service';
import { Regimen } from '../obj/Regimen';
import { RegimenService } from '../service/Regimen.service';

@Component({
  selector: 'app-dangkytiem',
  templateUrl: './dangkytiem.component.html',
  styleUrls: ['./dangkytiem.component.css']
})
export class DangkytiemComponent implements OnInit {
  //Biến chung
  id = this.routerId.snapshot.params.id; // Id customerRoom
  user : UserInfo = new UserInfo();
  userInfoCustomerRoom : CustomerRoom;
  listNextRoom : Room[] = [];
  listCustomerRoom : CustomerRoom[] = [];
  isStatusRoom : boolean;
  nextRoomSeleted : number;
  notify : Notify;
  //Biến riêng
  regimenDetails : RegimenDetails;
  dateNow : Date = new Date();
  dateFormat = "yyyy-MM-dd";
  listProductDetails : ProductDetails[] = [];
  listShowData : ProductDetails[] = [];
  listRegimen : Regimen[] = [];
  isPreInject = false;
  isErrorQuantity : boolean;
  isSelected : number;
  constructor(private regimenService : RegimenService, private notifyService : NotifyService, private datePipe : DatePipe, private regimenDetailsService: RegimenDetailsService, private productDetailsService : ProductDetailsService, private customerRoomService: CustomerRoomService, private roomService: RoomService, private userInfoService: UserInfoService, private categoriesService: CategoriesService, private router : Router, private routerId : ActivatedRoute, private location : Location) {
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
        if(this.user.roles != eVariables.roles_dieuduong && this.user.roles != eVariables.roles_bacsi && this.user.roles != eVariables.roles_quanly && this.user.roles != eVariables.roles_quantri){
          this.router.navigate(['/trangloi']);
        }
        else{
          this.ShowData();
        }
      });
    }
  }

  //Hàm riêng
  ShowData(){
    //Lấy thông tin khách hàng
    this.userInfoCustomerRoom = new CustomerRoom();
    this.userInfoCustomerRoom.customerRoomCustomer = new Customer();
    this.customerRoomService.GetCustomerRoomById(this.id).subscribe((customerRoom : any) => {
      this.userInfoCustomerRoom.customerRoomCustomer = customerRoom.customerRoomCustomer;
      //Kiểm tra khách hàng đã có chỉ định trong ngày hiện tại chưa, nếu có thì quay lại trang cũ
      this.regimenDetailsService.GetAllRegimenDetailsByCustomer(this.userInfoCustomerRoom.customerRoomCustomer.customerId).subscribe((response : RegimenDetails[]) => {
        if(response != null){
          response.forEach(item =>{
            if(item.dateInject.toString() == this.datePipe.transform(this.dateNow, this.dateFormat)){
              this.router.navigate(['/trangloi']);
            }
          });
        }
      });
    });
    //Lấy thông tin sản phẩm và tồn kho
    this.productDetailsService.GetAllProductDetails().subscribe((response : ProductDetails[]) => {
      if(response != null){
        response.forEach(item=>{
          this.listProductDetails.push(item);
        });

        this.listProductDetails.forEach(item=>{
          if(item.quantity > 0 ){
            item.quantity = 0;
            this.listShowData.push(item);
          }
        });
      }
    });
    //Lấy thông tin phác đồ
    this.regimenService.GetAllRegimen().subscribe((regimen : Regimen[]) => {
      if(regimen != null){
        this.listRegimen = regimen;
        this.isSelected = this.listRegimen[0].regimenId;
      }
    });
  }
  //Hàm riêng
  AddRegimenDetails(productDetailsId : number){
    this.listShowData.forEach(item =>{
      if(item.productDetailsId == productDetailsId){
        if(item.quantity < 3){
          item.quantity += 1;
        }
      }
    });
  }
  //Hàm riêng
  RemoveRegimenDetails(productDetailsId : number){
    this.listShowData.forEach(item =>{
      if(item.productDetailsId == productDetailsId){
        if(item.quantity > 0){
          item.quantity -= 1;
        }
      }
    });
  }
  //Hàm chung - cần sửa cho mỗi components
  Next_Finish(){
    //Chuyển khách sang phòng tiếp theo
    this.userInfoCustomerRoom.status = eVariables.status_wait;
    //Đóng cửa sổ chuyển phòng
    $('.closeChuyenPhong').click();
    //Lấy giá trị order by cho cột OrderBy
    this.customerRoomService.GetOrderByById(this.nextRoomSeleted).subscribe((orderBy : any) => {
      if(orderBy != null){
        this.userInfoCustomerRoom.orderBy = orderBy;
        this.userInfoCustomerRoom.customerRoomRoom = new Room();
        this.userInfoCustomerRoom.customerRoomRoom.roomId = this.nextRoomSeleted;
      }
      //Cập nhật tồn kho sản phẩm
      //Lấy thông tin sản phẩm và tồn kho
      this.productDetailsService.GetAllProductDetails().subscribe((response : ProductDetails[]) => {
        if(response != null){
          //Lấy data gốc
          response.forEach(itemOrigin=>{
            //Lấy data trên table
            this.listShowData.forEach(item =>{
              //Đặt điều kiện
              if(itemOrigin.productDetailsId == item.productDetailsId && item.quantity > 0){
                //Trừ số lượng tồn kho ( cho phép trừ tồn tới âm)
                itemOrigin.quantity = itemOrigin.quantity - item.quantity;
                this.isErrorQuantity = false;
                //Thêm thông tin lịch sử tiêm (chờ tiêm nên inject = false)
                this.regimenDetails = new RegimenDetails();
                this.regimenDetails.dateInject = new Date();
                this.regimenDetails.quantity = item.quantity;
                this.regimenDetails.inject = false;
                this.regimenDetails.regimenDetailsRegimen = new Regimen();
                this.regimenDetails.regimenDetailsRegimen.regimenId = this.isSelected;
                this.regimenDetails.regimenDetailsUserInfo = this.user;
                this.regimenDetails.regimenDetailsCustomer = this.userInfoCustomerRoom.customerRoomCustomer;
                this.regimenDetails.regimenDetailsProductDetails = item;
                //Đăng ký tiêm
                this.regimenDetailsService.PostRegimenDetails(this.regimenDetails).subscribe((response : any) => {});
                this.isPreInject = true;
                return false;
              }
            });
            //Cập nhật sản phẩm
            if(this.isPreInject){
              this.productDetailsService.PutProductDetails(itemOrigin.productDetailsId, itemOrigin).subscribe((response : any) => {});
            }
          });
          if(this.isPreInject){
            this.customerRoomService.PutCustomerRoom(this.id, this.userInfoCustomerRoom).subscribe((response) => {});
          }
        }
      });
      //Thêm thông báo
      this.notify = new Notify();
      this.notify.dates = new Date();
      var code = this.listNextRoom.find(x=>x.roomId == this.nextRoomSeleted).code;
      this.notify.details = this.user.roles + ' ' + this.user.fullName + eVariables.notify_move + eVariables.phongthungan + ' ' + code;
      this.notify.notifyCustomer = this.userInfoCustomerRoom.customerRoomCustomer;
      this.notify.notifyRoom = this.userInfoCustomerRoom.customerRoomRoom;
      this.notifyService.PostNotify(this.notify).subscribe((response) => {
      });
      //End
      this.GoBack();
    });
  }
  //Hàm chung
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
  //Hàm chung
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
}
