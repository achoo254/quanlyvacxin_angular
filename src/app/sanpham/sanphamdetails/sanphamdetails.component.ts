import { ProductService } from './../../service/Product.service';
import { Product } from '../../obj/Product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sanphamdetails',
  templateUrl: './sanphamdetails.component.html',
  styleUrls: ['./sanphamdetails.component.css']
})
export class SanphamdetailsComponent implements OnInit {
  product = new Product();
  baseUrl : string = location.origin;
  constructor(private service: ProductService,private router: ActivatedRoute,
    public redirect: Router) { }

  ngOnInit(): void {
    let id = this.router.snapshot.params.id;
    this.GetProductById(id);
  }

  GetProductById(id){
    this.service.GetProductById(id).subscribe((data : any) => {
      this.product = data;
    });
  }
}
