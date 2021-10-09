import { DoanhthuComponent } from './doanhthu/doanhthu.component';
import { HesomuitiemComponent } from './hesomuitiem/hesomuitiem.component';
import { NhanvienComponent } from './nhanvien/nhanvien.component';
import { PhongComponent } from './phong/phong.component';
import { DoimatkhauComponent } from './taikhoan/doimatkhau/doimatkhau.component';
import { DangkytiemComponent } from './dangkytiem/dangkytiem.component';
import { DangkykhamComponent } from './dangkykham/dangkykham.component';
import { TrangloiComponent } from './trangloi/trangloi.component';
import { DangkyComponent } from './taikhoan/dangky/dangky.component';
import { DangnhapComponent } from './taikhoan/dangnhap/dangnhap.component';
import { SanphamdetailsComponent } from './sanpham/sanphamdetails/sanphamdetails.component';
import { SanphamComponent } from './sanpham/sanpham.component';
import { TonkhoComponent } from './tonkho/tonkho.component';
import { ThongkeComponent } from './thongke/thongke.component';
import { PhacdoComponent } from './phacdo/phacdo.component';
import { LienheComponent } from './lienhe/lienhe.component';
import { LichsutiemComponent } from './lichsutiem/lichsutiem.component';
import { GioithieuComponent } from './gioithieu/gioithieu.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { TrangchinhComponent } from './trangchinh/trangchinh.component';
import { PhongtiemdetailsComponent } from './phongtiem/phongtiemdetails/phongtiemdetails.component';
import { ThungandetailsComponent } from './thungan/thungandetails/thungandetails.component';
import { PhongkhamdetailsComponent } from './phongkham/phongkhamdetails/phongkhamdetails.component';
import { TieptandetailsComponent } from './tieptan/tieptandetails/tieptandetails.component';
import { TaikhoanComponent } from './taikhoan/taikhoan.component';
import { PhongtiemComponent } from './phongtiem/phongtiem.component';
import { ThunganComponent } from './thungan/thungan.component';
import { PhongkhamComponent } from './phongkham/phongkham.component';
import { TieptanComponent } from './tieptan/tieptan.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component:TrangchinhComponent },
  {path: 'product/categories/:id', component:DanhmucComponent},
  {path: 'gioithieu', component:GioithieuComponent},
  {path: 'lichsutiem/:id', component:LichsutiemComponent},
  {path: 'lienhe', component:LienheComponent},
  {path: 'phacdo/:id', component:PhacdoComponent},
  {path: 'thongke', component:ThongkeComponent},
  {path: 'tonkho', component:TonkhoComponent},
  {path: 'phong', component:PhongComponent},
  {path: 'nhanvien', component:NhanvienComponent},
  {path: 'tieptan', component:TieptanComponent},
  {path: 'tieptandetails/:id', component:TieptandetailsComponent},
  {path: 'phongkham', component:PhongkhamComponent},
  {path: 'phongkhamdetails/:id', component:PhongkhamdetailsComponent},
  {path: 'thungan', component:ThunganComponent},
  {path: 'thungandetails/:id', component:ThungandetailsComponent},
  {path: 'phongtiem', component:PhongtiemComponent},
  {path: 'phongtiemdetails/:id', component:PhongtiemdetailsComponent},
  {path: 'taikhoan/:id', component:TaikhoanComponent},
  {path: 'doimatkhau/:id', component:DoimatkhauComponent},
  {path: 'dangnhap', component:DangnhapComponent},
  {path: 'dangky', component:DangkyComponent},
  {path: 'product', component:SanphamComponent},
  {path: 'product/:id', component:SanphamdetailsComponent},
  {path: 'trangloi', component:TrangloiComponent},
  {path: 'dangkykham', component:DangkykhamComponent},
  {path: 'dangkytiem/:id', component:DangkytiemComponent},
  {path: 'hesomuitiem', component:HesomuitiemComponent},
  {path: 'doanhthu', component:DoanhthuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
