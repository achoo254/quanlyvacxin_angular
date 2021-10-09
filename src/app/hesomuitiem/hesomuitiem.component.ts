import { RegimenDetailsEx } from './../obj/RegimenDetailsEx';
import { RegimenDetailsService } from 'src/app/service/RegimenDetails.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { isLogin } from '../function/myFunction';
import { UserInfo } from '../obj/UserInfo';
import { eVariables } from '../obj/variables';
import { UserInfoService } from '../service/UserInfo.service';

@Component({
  selector: 'app-hesomuitiem',
  templateUrl: './hesomuitiem.component.html',
  styleUrls: ['./hesomuitiem.component.scss']
})
export class HesomuitiemComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Tháng 1','Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];
  user : UserInfo = new UserInfo();
  listYear : number[] = [];
  isSelected : number;
  listDataInject : number[] = [];
  listDataNotInject : number[] = [];
  constructor(private regimenDetailsService : RegimenDetailsService, private userInfoService : UserInfoService, private router : Router) { }

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
    this.isSelected = new Date().getFullYear();
    for(let i = 2020 ; i <= 2030; i++){
      this.listYear.push(i);
    }
    this.LoadData(this.isSelected);
  }

  LoadData(year : number){
    //Reset dữ liệu
    this.listDataInject = [];
    this.listDataNotInject = [];
    //Load dữ liệu thống kê
    this.regimenDetailsService.GetAllRegimenDetailsByMonth(year, true).subscribe((response : RegimenDetailsEx[]) => {
      response.forEach(item =>{
        this.listDataInject.push(item.month1);
        this.listDataInject.push(item.month2);
        this.listDataInject.push(item.month3);
        this.listDataInject.push(item.month4);
        this.listDataInject.push(item.month5);
        this.listDataInject.push(item.month6);
        this.listDataInject.push(item.month7);
        this.listDataInject.push(item.month8);
        this.listDataInject.push(item.month9);
        this.listDataInject.push(item.month10);
        this.listDataInject.push(item.month11);
        this.listDataInject.push(item.month12);
      });
    });
    this.regimenDetailsService.GetAllRegimenDetailsByMonth(year, false).subscribe((response : RegimenDetailsEx[]) => {
      response.forEach(item => {
        this.listDataNotInject.push(item.month1);
        this.listDataNotInject.push(item.month2);
        this.listDataNotInject.push(item.month3);
        this.listDataNotInject.push(item.month4);
        this.listDataNotInject.push(item.month5);
        this.listDataNotInject.push(item.month6);
        this.listDataNotInject.push(item.month7);
        this.listDataNotInject.push(item.month8);
        this.listDataNotInject.push(item.month9);
        this.listDataNotInject.push(item.month10);
        this.listDataNotInject.push(item.month11);
        this.listDataNotInject.push(item.month12);
      });
    });
    //Hiển thị kết quả
    this.barChartData = [
      {data: this.listDataNotInject, label: 'Chưa tiêm'},
      {data: this.listDataInject, label: 'Đã tiêm',
      backgroundColor: "#4e73df",
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df"
    }
    ];
  }
}
