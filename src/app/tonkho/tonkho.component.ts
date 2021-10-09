import { FileDb } from './../obj/FilesDb';
import { UploadService } from './../service/Upload.service';
import { CategoriesService } from './../service/Categories.service';
import { Categories } from './../obj/Categories';
import { Product } from './../obj/Product';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { isLogin } from '../function/myFunction';
import { ProductDetails } from '../obj/ProductDetails';
import { UserInfo } from '../obj/UserInfo';
import { eVariables } from '../obj/variables';
import { ProductService } from '../service/Product.service';
import { ProductDetailsService } from '../service/ProductDetails.service';
import { UserInfoService } from '../service/UserInfo.service';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { interval } from 'rxjs';

@Component({
  selector: 'app-tonkho',
  templateUrl: './tonkho.component.html',
  styleUrls: ['./tonkho.component.css']
})
export class TonkhoComponent implements OnInit {
  //Biến chung
  baseUrl : string = location.origin;
  user : UserInfo = new UserInfo();
  listProductDetails : ProductDetails[] = [];
  productDetailsId : number;
  isAddEditForm : boolean;
  product : Product = new Product();
  productDetails : ProductDetails = new ProductDetails();
  listCategories : Categories[] = [];
  categories : Categories = new Categories();
  listImages : FileDb[] = [];
  categoriesIndex : number;
  isSelected : number;
  dateNow : Date = new Date();
  dateFormat = "yyyy-MM-dd";
  getDate : string;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRefDelete : BsModalRef;
  process : number = 0;
  isAddEditProduct : boolean;
  isAddEditProductDetails : boolean;
  btnName : string;
  constructor(private modalService: BsModalService, private uploadService : UploadService, private datePipe : DatePipe, private categoriesService : CategoriesService, private productService : ProductService, private productDetailsService : ProductDetailsService, private userInfoService: UserInfoService, private router : Router) {
  }

  ngOnInit(): void {
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
    this.productDetailsService.GetAllProductDetails().subscribe((response : ProductDetails[]) => {
      if(response != null){
        response.forEach(item=>{
          this.listProductDetails.push(item);
        });
      }
    });
  }

  initAddEditProduct(productDetailsId : number){
    this.isAddEditForm = true;
    this.getDate = this.datePipe.transform(this.dateNow, this.dateFormat);
    //Edit
    if(productDetailsId > 0){
      this.btnName = 'Cập nhật';
      //Đổi trạng thái
      this.isAddEditProductDetails = true;
      this.isAddEditProduct = true;
      this.productDetailsService.GetProductDetailsById(productDetailsId).subscribe((response : ProductDetails) => {
        if(response != null){
          this.productDetails = response;
          this.productService.GetProductById(response.productDetailsProduct.productId).subscribe((item : Product) => {
            if(item != null){
              this.product = item;
              this.categoriesService.GetAllCategories().subscribe((categories : Categories[]) => {
                if(categories != null){
                  this.listCategories = categories;
                  this.listCategories.forEach(item =>{
                    if(item.categoriesId == this.productDetails.productDetailsCategories.categoriesId){
                      this.isSelected = item.categoriesId;
                    }
                  });
                  //this.isSelected = this.listCategories.find(x=>x.categoriesId = this.productDetails.productDetailsCategories.categoriesId).categoriesId;
                }
              });
            }
          });
        }
      });
    }
    //Add
    else{
      this.btnName = 'Thêm mới';
      //Đổi trạng thái
      this.isAddEditProductDetails = false;
      this.isAddEditProduct = true;
      this.product = new Product();
      this.productDetails = new ProductDetails();
      this.categoriesService.GetAllCategories().subscribe((categories : Categories[]) => {
        if(categories != null){
          this.listCategories = categories;
          this.isSelected = this.listCategories[0].categoriesId;
        }
      });
    }
  }

  AddEditProduct(productId : number, productDetailsId : number, template: TemplateRef<any>){
    if(productDetailsId > 0 && productId > 0){
      //Thêm Id cho cột categoriesId trong ProductDetails
      this.productDetails.productDetailsCategories = new Categories();
      this.productDetails.productDetailsCategories.categoriesId = this.isSelected;
      this.productService.PutProduct(productId, this.product).subscribe((response : Product) => {
        if(response != null){
          this.productDetailsService.PutProductDetails(productDetailsId, this.productDetails).subscribe((item : ProductDetails) => {
            if(item != null){
              this.openCloseModalAutoSubmit(template);
            }
          });
        }
      });
    }
    else{
      //Gán các giá trị null cho các biến list trong bảng product và productdetails
      this.product.listProductDetails = null;
      this.productDetails.listRegimenDetails = null;
      this.productDetails.productDetailsProduct = new Product();
      //Thêm mới
      this.productService.PostProduct(this.product).subscribe((response : Product) => {
        if(response != null){
          this.productDetails.productDetailsProduct.productId = response.productId;
          //Thêm Id cho cột categoriesId trong ProductDetails
          this.productDetails.productDetailsCategories = new Categories();
          this.productDetails.productDetailsCategories.categoriesId = this.isSelected;
          this.productDetailsService.PostProductDetails(this.productDetails).subscribe((item : ProductDetails) => {
            if(item != null){
              this.openCloseModalAutoSubmit(template);
            }
          });
        }
      });
    }
  }

  AddEditProductDetails(productId : number, template: TemplateRef<any>){
    if(productId > 0){
      this.productDetails.productDetailsId = null;
      //Thêm Id cho cột categoriesId trong ProductDetails
      this.productDetails.productDetailsCategories = new Categories();
      this.productDetails.productDetailsCategories.categoriesId = this.isSelected;
      this.productDetails.listRegimenDetails = null;
      this.productDetails.productDetailsProduct = new Product();
      this.productDetails.productDetailsProduct.productId = productId;
      this.productDetailsService.PostProductDetails(this.productDetails).subscribe((item : ProductDetails) => {
        if(item != null){
          //Đổi trạng thái
          this.isAddEditProductDetails = true;
          this.isAddEditProduct = false;
          this.openCloseModalAutoSubmit(template);
        }
      });
    }
  }

  deleteProductDetails(producDetailstId : number, template: TemplateRef<any>){
    if(producDetailstId > 0){
      this.productDetailsService.DeleteProductDetails(producDetailstId).subscribe((check : boolean) => {
        if(check){
          setTimeout(()=>{
          $('#dataTableTonKho').load(window.location.href + "#dataTableTonKho" );
          }, 2000);
        }
        else{
          this.modalRefDelete = this.modalService.show(template, { id: 3, class: 'modal-sm' });
          setTimeout(()=>{
            this.modalService.hide(3);
        }, 2000);
        }
      });
    }
  }

  selectFile(event){
    this.uploadFile(event.target.files);
  }

  chooseFile(url : string){
    this.modalService.hide(1);//Đóng modal theo Id của modal
    this.product.images = url;
  }

  openModalChooseImages(template: TemplateRef<any>) {
    this.uploadService.GetAllFile().subscribe((response : FileDb[]) => {
      this.listImages = response;
      this.listImages.sort(function (a, b) {
        return ('' + a.name).localeCompare(b.name);
    });
    });
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }

  openCloseModalAutoSubmit(template: TemplateRef<any>){
    this.modalRef2 = this.modalService.show(template, { id: 2, class: 'modal-sm' });
    setTimeout(()=>{
      this.modalService.hide(2);
  }, 2000);
  }

  uploadFile(files: FileList) {
    if (files.length == 0) {
      console.log("No file selected!");
      return
    }
    //let file: File = files[0];
    for (var i = 0; i < files.length; i++) {
    this.process = 0;
    let file = files.item(i);
    this.uploadService.PostFile(file)
    .subscribe(
      event => {
        if (event.type == HttpEventType.UploadProgress) {
          //const percentDone = Math.round(100 * event.loaded / event.total);
          this.process = Math.round(100 * event.loaded / event.total);
          //console.log(`File is ${percentDone}% loaded.`);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely loaded!');
        }
      },
      (err) => {
        console.log("Upload Error:", err);
      }, () => {
        console.log("Upload done");
      }
    )
    }
  }
}
