import { OrdersEx } from './../obj/OrdersEx';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { isLogin } from '../function/myFunction';
import { UserInfo } from '../obj/UserInfo';
import { eVariables } from '../obj/variables';
import { OrdersService } from '../service/Orders.service';
import { UserInfoService } from '../service/UserInfo.service';

@Component({
  selector: 'app-doanhthu',
  templateUrl: './doanhthu.component.html',
  styleUrls: ['./doanhthu.component.scss']
})
export class DoanhthuComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          callback: function(value, index, values) {
            return value.toLocaleString();
          }
        },
      }],
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel +': '+ tooltipItem.yLabel.toLocaleString()+ ' đồng' ;
        }
      }
    }
  };
  public barChartLabels: Label[] = ['Tháng 1','Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];
  user : UserInfo = new UserInfo();
  listYear : number[] = [];
  isSelected : number;
  listData : number[] = [];
  constructor(private ordersService : OrdersService, private userInfoService : UserInfoService, private router : Router) { }

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
    this.listData = [];
    //Load dữ liệu thống kê
    this.ordersService.GetAllOrdersByMonth(year).subscribe((response : OrdersEx[]) => {
      response.forEach(item =>{
        this.listData.push(item.month1);
        this.listData.push(item.month2);
        this.listData.push(item.month3);
        this.listData.push(item.month4);
        this.listData.push(item.month5);
        this.listData.push(item.month6);
        this.listData.push(item.month7);
        this.listData.push(item.month8);
        this.listData.push(item.month9);
        this.listData.push(item.month10);
        this.listData.push(item.month11);
        this.listData.push(item.month12);
      });
    });
    //Hiển thị kết quả
    this.barChartData = [
      {data: this.listData, label: 'Doanh thu',
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2
    }
    ];
  }
}
