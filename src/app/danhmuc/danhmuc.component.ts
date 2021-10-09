import { ProductDetails } from './../obj/ProductDetails';
import { ProductDetailsService } from './../service/ProductDetails.service';
import { CategoriesService } from './../service/Categories.service';
import { Categories } from '../obj/Categories';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inArray } from 'jquery';

@Component({
  selector: 'app-danhmuc',
  templateUrl: './danhmuc.component.html',
  styleUrls: ['./danhmuc.component.css']
})
export class DanhmucComponent implements OnInit {
  productDetails : ProductDetails[] = [];
  categories : Categories = new Categories();
  baseUrl : string = location.origin;
  constructor(private categoriesService: CategoriesService, private service: ProductDetailsService,public router: ActivatedRoute,
    public redirect: Router) { }

  ngOnInit(): void {
    let id = this.router.snapshot.params.id;
    this.service.GetAllProductDetailsByCategories(id).subscribe((data : ProductDetails[]) => {
      data.forEach(item=>{
        let exist = false;
        this.productDetails.forEach(data =>{
          if(item.productDetailsProduct.name == data.productDetailsProduct.name){
            exist = true;
            return exist
          }
        });
        if(!exist)
        {
          this.productDetails.push(item);
        }
      });
    });
    this.categoriesService.GetCategoriesById(id).subscribe((data : any) => {
      this.categories = data;
    });
  }
}
