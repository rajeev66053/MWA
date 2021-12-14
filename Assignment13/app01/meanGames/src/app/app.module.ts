import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { GamesListComponent } from './games-list/games-list.component';
import { OrderPipe } from './order.pipe';
import { HomePageComponent } from './home-page/home-page.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameAddOneComponent } from './game-add-one/game-add-one.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    OrderPipe,
    HomePageComponent,
    GameDetailsComponent,
    GameAddOneComponent
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
        path:"games",
        component:GamesListComponent
      },
      {
        path:"games/create",
        component:GameAddOneComponent
      },
      {
        path:"game/:gameId",
        component:GameDetailsComponent
      }
    ])
    
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
  // bootstrap: [GamesListComponent]
})
export class AppModule { }
