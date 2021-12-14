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
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit {

  title:string = 'Electronics Brands Details';

  brand:Brand={} as Brand;
  // editedBrand:any={} as Brand;

  constructor(private brandsDataService:BrandsDataService,private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const brandId:string=this.route.snapshot.params.brandId;
    this.getBrand(brandId);
  }
  
  updateBrand(f:NgForm){
    console.log(f.value);
    this.brand.name=f.value.name;
    this.brand.founded=parseInt(f.value.founded);
    this.brand.headOffice=f.value.headOffice;
    const brandId:string=this.route.snapshot.params.brandId;
    
    // console.log(this.brand);
    this.fullUpdateOneBrand(brandId,this.brand);
  }

  deleteBrand(){
    const brandId:string=this.route.snapshot.params.brandId;
    this.deleteOneBrand(brandId);
  }

  private getBrand(brandId:string):void{
    
    this.brandsDataService.getBrand(brandId).then((response)=>this.gotBrand(response)).catch(this.handleGetBrandError);
  }

  private  gotBrand(response:Brand){
    console.log(response);
    this.brand=response;
    // this.editedBrand=this.brand;
  }

  private handleGetBrandError(error:any){
    console.log(error);
  }

  private fullUpdateOneBrand(brandId:string,brand:any):void{
    this.brandsDataService.fullUpdateOneBrand(brandId,brand).then((response)=>this.updatedBrand(response)).catch(this.handleUpdateBrandError);
  }

  private updatedBrand(response:any){
    console.log(response);
    this.brand=response.brand;
  }

  private handleUpdateBrandError(error:any){
    console.log(error);
  }

  private deleteOneBrand(brandId:string):void{
    this.brandsDataService.deleteOneBrand(brandId).then((response)=>this.deletedBrand(response)).catch(this.handleDeleteBrandError);
  }

  private deletedBrand(response:Brand){
    console.log(response);
    this.router.navigate(['/brands']);
  }

  private handleDeleteBrandError(error:any){
    console.log(error);
  }



}
