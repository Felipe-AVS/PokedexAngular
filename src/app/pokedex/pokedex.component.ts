import { Component } from '@angular/core';
import { Pokemon } from '../Pokemon';
import { Pokedex } from '../pokedex.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent {
  pokemon: any = {} as Pokemon;
  nomePesquisado : string = "";
  idPesquisado : string = "";
  idConvert : number = parseInt(this.idPesquisado);
  shiny: boolean = false;

  constructor(private service: Pokedex) { }

  ngOnInit(): void {
    this.loadPokemon();
  }

  getImg(): string { return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon.id}.png` }
  getImgShiny(): string { return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${this.pokemon.id}.png` }

  searchPokemon() {
    this.shiny = false;
    if(this.nomePesquisado != "" && this.idPesquisado == ""){
      this.service.nomeChave = this.nomePesquisado.toLowerCase();
      this.service.idChave == this.pokemon.id;
      this.service.getPokemon().subscribe(
        {
          next: data => {
            this.pokemon = data;
            this.pokemon.img = this.getImg();
            this.pokemon.type = data.types.type.name;
          }
        }
      );
      this.nomePesquisado = "";
    }
  }
  


  
  backwardPokemon() {
    this.shiny = false;
    this.service.idChave = this.pokemon.id;
    if (this.service.idChave == 0 ) {
      this.service.idChave = this.service.idChave;
    } else {
      this.service.idChave = this.service.idChave - 1;
    }
    this.service.getPokemonByID().subscribe(
      {
        next: data => {
          this.pokemon = data;
          this.pokemon.img = data.sprites.other.home.front_default;
          this.pokemon.img = this.getImg();
        }
      }
    );
  }

  forwardPokemon() {
    this.shiny = false;
    this.service.idChave = this.pokemon.id;
    this.service.idChave = this.service.idChave + 1;
    this.service.getPokemonByID().subscribe(
      {
        next: data => {
          this.pokemon = data;
          this.pokemon.img = data.sprites.other.home.front_default;
          this.pokemon.img = this.getImg();
        }
      }
    );
  }

  loadPokemon() {
    this.shiny = false;
    this.service.getPokemonByID().subscribe(
      {
        next: data => {
          this.pokemon = data;
          this.pokemon.img = this.getImg();
        }
      }
    );
  }

  shinyPokemon() {
   if(this.shiny == false){
    this.shiny = true;
    this.pokemon.img = this.getImgShiny();
   }else{
    this.pokemon.img = this.getImg();
    this.shiny = false;
  }
   
  }

  getPokeName(): string {
    return this.service.nomeChave = this.nomePesquisado;
  }
 
  getPokeId(): number{
    return this.pokemon.id;
  }
}
