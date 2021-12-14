import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import { GamesDataService } from "../games-data.service";

export class Game{
  _id!:number;
  title!:String;
  year!:number;
  rate!:number;
  price!:number;
  minPlayers!:number;
  maxPlayers!:number;
  minAge!:number;
  designers!:string;
}

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  title:string = 'MEAN Games';

  games:Game[]=[];

  game:Game={} as Game;

  constructor(private gamesDataService:GamesDataService,private route:ActivatedRoute, private router: Router) {  }

  ngOnInit(): void {
    this.getGames();    
  }

  addGame(f:NgForm){
    this.game.title=f.value.price;
    this.game.rate=parseFloat(f.value.rate);
    this.game.price=parseFloat(f.value.price);
    this.game.minPlayers=parseInt(f.value.minPlayers);
    this.game.maxPlayers=parseInt(f.value.maxPlayers);
    this.game.minAge=parseInt(f.value.minAge);
    this.addOneGame(this.game);
  }

  private getGames():void{
    this.gamesDataService.getGames().then((response)=>this.gotGames(this,response)).catch(this.handleGetGamesError);
  }

  private gotGames(gamesListComponent:GamesListComponent,response:Game[]){
    gamesListComponent.games=response;
  }

  private handleGetGamesError(error:any){
    console.log(error);
  }
  
  private addOneGame(game:any):void{
    this.gamesDataService.addOneGame(game).then((response)=>this.addedGame(response)).catch(this.handleAddGameError);
  }
  
  private  addedGame(response:Game){
    console.log(response);
    this.game=response;
    this.router.navigate(['/games']);
  }

  private handleAddGameError(error:any){
    console.log(error);
  }

}
