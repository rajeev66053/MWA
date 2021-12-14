import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import { GamesDataService } from "../games-data.service";

export class Game{
  _id!:number;
  title!:String;
  price!:number;
  minPlayers!:number;
  maxPlayers!:number;
  minAge!:number;
}

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  title:string = 'MEAN Game Details';

  game:Game={} as Game;
  // editedGame:any={} as Game;

  constructor(private gamesDataService:GamesDataService,private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const gameId:string=this.route.snapshot.params.gameId;
    this.getGame(gameId);
  }
  
  updateGame(f:NgForm){
    console.log(f.value);
    this.game.price=parseFloat(f.value.price);
    this.game.minPlayers=parseInt(f.value.minPlayers);
    this.game.maxPlayers=parseInt(f.value.maxPlayers);
    this.game.minAge=parseInt(f.value.minAge);
    const gameId:string=this.route.snapshot.params.gameId;
    
    // console.log(this.game);
    this.fullUpdateOneGame(gameId,this.game);
  }

  deleteGame(){
    const gameId:string=this.route.snapshot.params.gameId;
    this.deleteOneGame(gameId);
  }

  private getGame(gameId:string):void{
    
    this.gamesDataService.getGame(gameId).then((response)=>this.gotGame(response)).catch(this.handleGetGameError);
  }

  private  gotGame(response:Game){
    console.log(response);
    this.game=response;
    // this.editedGame=this.game;
  }

  private handleGetGameError(error:any){
    console.log(error);
  }

  private fullUpdateOneGame(gameId:string,game:any):void{
    this.gamesDataService.fullUpdateOneGame(gameId,game).then((response)=>this.updatedGame(response)).catch(this.handleUpdateGameError);
  }

  private updatedGame(response:any){
    console.log(response);
    this.game=response.game;
  }

  private handleUpdateGameError(error:any){
    console.log(error);
  }

  private deleteOneGame(gameId:string):void{
    this.gamesDataService.deleteOneGame(gameId).then((response)=>this.deletedGame(response)).catch(this.handleDeleteGameError);
  }

  private deletedGame(response:Game){
    console.log(response);
    this.router.navigate(['/games']);
  }

  private handleDeleteGameError(error:any){
    console.log(error);
  }



}
