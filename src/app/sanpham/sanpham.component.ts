import { ProductService } from './../service/Product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})
export class SanphamComponent implements OnInit {
  listProduct  : Object;
  baseUrl : string = location.origin;
  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.GetAllProduct();

  }

  GetAllProduct(){
    this.service.GetAllProduct().subscribe(data => {
      this.listProduct = data;
    });
  }
}
