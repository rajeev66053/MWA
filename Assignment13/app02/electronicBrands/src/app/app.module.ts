import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { BrandsListComponent } from './brands-list/brands-list.component';
import { OrderPipe } from './order.pipe';
import { HomePageComponent } from './home-page/home-page.component';
import { BrandDetailsComponent } from './brand-details/brand-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandsListComponent,
    OrderPipe,
    HomePageComponent,
    BrandDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:"",
        component:HomePageComponent
      },
      {
        path:"brands",
        component:BrandsListComponent
      },
      {
        path:"brand/:brandId",
        component:BrandDetailsComponent
      }
    ])
    
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
