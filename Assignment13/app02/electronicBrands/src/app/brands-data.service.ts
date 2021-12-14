import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import { Brand } from "./brands-list/brands-list.component"
 
@Injectable({
  providedIn: 'root'
})
export class BrandsDataService {
  private baseURL="http://localhost:4000/api";

  constructor(private http:HttpClient) { }

  public getBrands():Promise<Brand[]>{
    //1.Build URL
    const url:string=this.baseURL+"/brands";
    //2.Tell http service to make request
    //3.Convert the Observable result to promise
    //4.Convert the response to JSON
    //5.Return the response
    //6.Catch and handle errors
    return this.http.get(url).toPromise().then(this.gotBrands).catch(this.handleBrandsListError);
  }

  
  private gotBrands(response:any):Brand[]{
    return response as Brand[];
  }

  private handleBrandsListError(error:any):Brand[] {
    console.log("Error"+error);
    return {} as Brand[];
  }

  public addOneBrand(data:any):Promise<Brand>{
    const url:string=this.baseURL+"/brands";
    return this.http.post(url, data).toPromise().then(this.addBrand).catch(this.handleAddBrandError);
  }

  private addBrand(response:any):Brand{
    return response as Brand;
  }

  private handleAddBrandError(error:any):Brand{
    console.log("Error"+error);
    return {} as Brand;
  }

  public getBrand(brandId:string):Promise<Brand>{
    //1.Build URL
    const url:string=this.baseURL+"/brands/"+brandId;
    //2.Tell http service to make request
    //3.Convert the Observable result to promise
    //4.Convert the response to JSON
    //5.Return the response
    //6.Catch and handle errors
    return this.http.get(url).toPromise().then(this.gotBrand).catch(this.handleBrandDetailError);
  }


  private gotBrand(response:any):Brand{
    return response as Brand;
  }

  private handleBrandDetailError(error:any):Brand{
    console.log("Error"+error);
    return {} as Brand;
  }

  public fullUpdateOneBrand(brandId:string,data:any):Promise<Brand>{
    //1.Build URL
    const url:string=this.baseURL+"/brands/"+brandId;
    //2.Tell http service to make request
    //3.Convert the Observable result to promise
    //4.Convert the response to JSON
    //5.Return the response
    //6.Catch and handle errors
    return this.http.put(url,data).toPromise().then(this.updatedBrand).catch(this.handleUpdateBrandError);
  }

  
  private updatedBrand(response:any):Brand{
    return response as Brand;
  }

  private handleUpdateBrandError(error:any):Brand{
    console.log("Error"+error);
    return {} as Brand;
  }

  public deleteOneBrand(brandId:string):Promise<Brand>{
    //1.Build URL
    const url:string=this.baseURL+"/brands/"+brandId;
    //2.Tell http service to make request
    //3.Convert the Observable result to promise
    //4.Convert the response to JSON
    //5.Return the response
    //6.Catch and handle errors
    return this.http.delete(url).toPromise().then(this.deletedBrand).catch(this.handleDeleteBrandError);
  }


  private deletedBrand(response:any):Brand{
    return response as Brand;
  }

  private handleDeleteBrandError(error:any):Brand{
    console.log("Error"+error);
    return {} as Brand;
  }
}
