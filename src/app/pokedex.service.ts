import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from './Pokemon';
import { PokedexComponent } from './pokedex/pokedex.component';

@Injectable({
  providedIn: 'root'
})
export class Pokedex {
  url : string = "https://pokeapi.co/api/v2/pokemon/"
  public idChave : number = 1;
  public nomeChave : string = "";
  public area : string = "https://pokeapi.co/api/v2/pokemon/"
  //Injeção
  constructor(private http:HttpClient) {}

  getPokemonByID() : Observable<any>{
      return this.http.get<any>(this.url+this.idChave)
  }
  getPokemon() : Observable<any>{
    return this.http.get<any>(this.url+this.nomeChave)
}
}
