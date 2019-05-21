import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Pokemon} from '../../shared/models/pokemon/pokemon';

@Component({
  selector: 'app-pokemon-renderer',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Input('pokemon')
  pokemon: Pokemon;
  @Input('isFirst')
  isFirst: boolean;
  pokemonSprite: string;

  @ViewChild('pokemon') pokemonRenderer: ElementRef;

  ngOnInit(): void {
      this.pokemonSprite = `https://img.pokemondb.net/sprites/black-white/anim/${this.isFirst ? 'back-' : ''}normal/${this.pokemon.Name.toLowerCase()}.gif`;
      this.setPosition();
  }

  private setPosition(): void {
      this.pokemonRenderer.nativeElement.classList.add(this.isFirst ? 'firstPokemon' : 'secondPokemon');
  }
}
