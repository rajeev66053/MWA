import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import { BrandsDataService } from "../brands-data.service";

export class Brand{
  _id!:number;
  name!:String;
  founded!:number;
  headOffice!:string;
}

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnInit {

  title:string = 'Electronics Brands';

  brands:Brand[]=[];

  brand:Brand={} as Brand;

  constructor(private brandsDataService:BrandsDataService,private route:ActivatedRoute, private router: Router) {  }

  ngOnInit(): void {
    this.getBrands();    
  }

  addBrand(f:NgForm){
    this.brand.name=f.value.name;
    this.brand.founded=parseInt(f.value.founded);
    this.brand.headOffice=f.value.headOffice;
    this.addOneBrand(this.brand);
  }

  private getBrands():void{
    this.brandsDataService.getBrands().then((response)=>this.gotBrands(response)).catch(this.handleGetBrandsError);
  }

  private gotBrands(response:any){
    this.brands=response.brands;
  }

  private handleGetBrandsError(error:any){
    console.log(error);
  }
  
  private addOneBrand(brand:any):void{
    this.brandsDataService.addOneBrand(brand).then((response)=>this.addedBrand(response)).catch(this.handleAddBrandError);
  }
  
  private  addedBrand(response:Brand){
    console.log(response);
    this.brand=response;
    this.router.navigate(['/brands']);
  }

  private handleAddBrandError(error:any){
    console.log(error);
  }

}
