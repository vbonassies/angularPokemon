import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BackgroundPokemon } from '../../shared/models/background/background-pokemon';
import { PokemonDirection } from '../../shared/models/background/pokemon-direction';
import Timer = NodeJS.Timer;

@Component({
  selector: 'app-background-pokemon',
  templateUrl: './background-pokemon.component.html',
  styleUrls: ['./background-pokemon.component.css']
})
export class BackgroundPokemonComponent implements OnInit, OnDestroy {

  public flyingBackgroundPokemons = [
    'zubat',
    'pidgeot',
    'ledyba',
    'fletchinder',
    'noibat',
    'noctowl',
    'togetic',
    'yanma',
    'yanmega',
    'wingull',
    'hooh',
    'mantine',
    'talonflame',
    'beautifly',
    'charizard',
    'skiploom'
  ];

  public activePokemons: Array<BackgroundPokemon> = [];
  private interval: Timer;

  @Input() pokemon: BackgroundPokemon;

  constructor() {
  }

  private static getRandomHeight(): number {
    return Math.floor(Math.random() * 60);
  }

  public static getDirection(random: () => number = Math.random): PokemonDirection {
    return random() > 0.5 ? PokemonDirection.left : PokemonDirection.right;
  }

  public getRandomPokemon(random: () => number = Math.random): string {
    const max = this.flyingBackgroundPokemons.length;
    const index = Math.floor(random() * max);
    return this.flyingBackgroundPokemons[index];
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      if (document.hidden) {
        return;
      }
      this.addPokemon();
    }, 2000);
  }

  private addPokemon(): void {
    const name = this.getRandomPokemon();
    const direction = BackgroundPokemonComponent.getDirection();
    const pokemonInstance = new BackgroundPokemon(name, direction, BackgroundPokemonComponent.getRandomHeight());

    this.activePokemons.push(pokemonInstance);
    setTimeout(() => {
      const index = this.activePokemons.indexOf(pokemonInstance);
      if (index >= 0) {
        this.activePokemons.splice(index, 1);
      }
    }, 10000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.activePokemons = [];
  }
}
