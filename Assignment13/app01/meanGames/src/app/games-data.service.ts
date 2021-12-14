import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import { Game} from "./games-list/games-list.component"
 
@Injectable({
  providedIn: 'root'
})
export class GamesDataService {
  private baseURL="http://localhost:4000/api";

  constructor(private http:HttpClient) { }

  public getGames():Promise<Game[]>{
    //1.Build URL
    const url:string=this.baseURL+"/games";
    //2.Tell http service to make request
    //3.Convert the Observable result to promise
    //4.Convert the response to JSON
    //5.Return the response
    //6.Catch and handle errors
    return this.http.get(url).toPromise().then(this.gotGames).catch(this.handleGamesListError);
  }

  
  private gotGames(response:any):Game[]{
    return response as Game[];
  }

  private handleGamesListError(error:any):Game[] {
    console.log("Error"+error);
    return {} as Game[];
  }

  public addOneGame(data:any):Promise<Game>{
    const url:string=this.baseURL+"/games";
    return this.http.post(url, data).toPromise().then(this.addGame).catch(this.handleAddGameError);
  }

  private addGame(response:any):Game{
    return response as Game;
  }

  private handleAddGameError(error:any):Game{
    console.log("Error"+error);
    return {} as Game;
  }

  public getGame(gameId:string):Promise<Game>{
    //1.Build URL
    const url:string=this.baseURL+"/games/"+gameId;
    //2.Tell http service to make request
    //3.Convert the Observable result to promise
    //4.Convert the response to JSON
    //5.Return the response
    //6.Catch and handle errors
    return this.http.get(url).toPromise().then(this.gotGame).catch(this.handleGameDetailError);
  }


  private gotGame(response:any):Game{
    return response as Game;
  }

  private handleGameDetailError(error:any):Game{
    console.log("Error"+error);
    return {} as Game;
  }

  public fullUpdateOneGame(gameId:string,data:any):Promise<Game>{
    //1.Build URL
    const url:string=this.baseURL+"/games/"+gameId;
    //2.Tell http service to make request
    //3.Convert the Observable result to promise
    //4.Convert the response to JSON
    //5.Return the response
    //6.Catch and handle errors
    return this.http.put(url,data).toPromise().then(this.updatedGame).catch(this.handleUpdateGameError);
  }

  
  private updatedGame(response:any):Game{
    return response as Game;
  }

  private handleUpdateGameError(error:any):Game{
    console.log("Error"+error);
    return {} as Game;
  }

  public deleteOneGame(gameId:string):Promise<Game>{
    //1.Build URL
    const url:string=this.baseURL+"/games/"+gameId;
    //2.Tell http service to make request
    //3.Convert the Observable result to promise
    //4.Convert the response to JSON
    //5.Return the response
    //6.Catch and handle errors
    return this.http.delete(url).toPromise().then(this.deletedGame).catch(this.handleDeleteGameError);
  }


  private deletedGame(response:any):Game{
    return response as Game;
  }

  private handleDeleteGameError(error:any):Game{
    console.log("Error"+error);
    return {} as Game;
  }
}
