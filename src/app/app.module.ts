import { DoimatkhauComponent } from './taikhoan/doimatkhau/doimatkhau.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TieptanComponent } from './tieptan/tieptan.component';
import { PhongkhamComponent } from './phongkham/phongkham.component';
import { ThunganComponent } from './thungan/thungan.component';
import { PhongtiemComponent } from './phongtiem/phongtiem.component';
import { TaikhoanComponent } from './taikhoan/taikhoan.component';
import { TieptandetailsComponent } from './tieptan/tieptandetails/tieptandetails.component';
import { PhongkhamdetailsComponent } from './phongkham/phongkhamdetails/phongkhamdetails.component';
import { PhongtiemdetailsComponent } from './phongtiem/phongtiemdetails/phongtiemdetails.component';
import { TaikhoandetailsComponent } from './taikhoan/taikhoandetails/taikhoandetails.component';
import { ThungandetailsComponent } from './thungan/thungandetails/thungandetails.component';
import { TrangchinhComponent } from './trangchinh/trangchinh.component';
import { LienheComponent } from './lienhe/lienhe.component';
import { GioithieuComponent } from './gioithieu/gioithieu.component';
import { LichsutiemComponent } from './lichsutiem/lichsutiem.component';
import { PhacdoComponent } from './phacdo/phacdo.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { ThongkeComponent } from './thongke/thongke.component';
import { TonkhoComponent } from './tonkho/tonkho.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SanphamComponent } from './sanpham/sanpham.component';
import { SanphamdetailsComponent } from './sanpham/sanphamdetails/sanphamdetails.component';
import { DangnhapComponent } from './taikhoan/dangnhap/dangnhap.component';
import { DangkyComponent } from './taikhoan/dangky/dangky.component';
import { TrangloiComponent } from './trangloi/trangloi.component';
import { DangkykhamComponent } from './dangkykham/dangkykham.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { DangkytiemComponent } from './dangkytiem/dangkytiem.component';
import { DatePipe } from '@angular/common';
import { PhongComponent } from './phong/phong.component';
import { NhanvienComponent } from './nhanvien/nhanvien.component';
import { QuillModule } from 'ngx-quill';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { HesomuitiemComponent } from './hesomuitiem/hesomuitiem.component';
import { DoanhthuComponent } from './doanhthu/doanhthu.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    TieptanComponent,
    PhongkhamComponent,
    ThunganComponent,
    PhongtiemComponent,
    TaikhoanComponent,
    DoimatkhauComponent,
    TieptandetailsComponent,
    PhongkhamdetailsComponent,
    PhongtiemdetailsComponent,
    TaikhoandetailsComponent,
    ThungandetailsComponent,
    TrangchinhComponent,
    LienheComponent,
    GioithieuComponent,
    LichsutiemComponent,
    PhacdoComponent,
    DanhmucComponent,
    ThongkeComponent,
    TonkhoComponent,
    SanphamComponent,
    SanphamdetailsComponent,
    DangnhapComponent,
    DangkyComponent,
    TrangloiComponent,
    DangkykhamComponent,
    DangkytiemComponent,
      TonkhoComponent,
      PhongComponent,
      NhanvienComponent,
      HesomuitiemComponent,
      DoanhthuComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    DataTablesModule,
    QuillModule.forRoot(),
    ChartsModule,
    UiSwitchModule.forRoot({
      checkedLabel: 'On phòng',
      uncheckedLabel: 'Off phòng',
      checkedTextColor: '#fff',
      uncheckedTextColor: '#e74a3b'
    }),
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
