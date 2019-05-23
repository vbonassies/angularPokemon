import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BackgroundPokemon} from '../../shared/models/background/background-pokemon';
import {PokemonDirection} from '../../shared/models/background/pokemon-direction';
import Timer = NodeJS.Timer;
import {SpriteService} from '../../shared/services/sprite.service';

@Component({
    selector: 'app-background-pokemon',
    templateUrl: './background-pokemon.component.html',
    styleUrls: ['./background-pokemon.component.css']
})
export class BackgroundPokemonComponent implements OnInit, OnDestroy {
    public activePokemons: Array<BackgroundPokemon> = [];
    private interval: Timer;
    private timeouts: Timer[] = [];

    @Input() pokemon: BackgroundPokemon;

    constructor(public spriteService: SpriteService) {
    }

    private static getRandomHeight(): number {
        return Math.floor(Math.random() * 60);
    }

    public static getDirection(random: () => number = Math.random): PokemonDirection {
        return random() > 0.5 ? PokemonDirection.right : PokemonDirection.left;
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
        const pokemon = this.spriteService.getRandomFlyingPokemonName();
        const direction = BackgroundPokemonComponent.getDirection();
        const pokemonInstance = new BackgroundPokemon(pokemon, direction, BackgroundPokemonComponent.getRandomHeight());

        this.activePokemons.push(pokemonInstance);
        const timeout = setTimeout(() => {
            const index = this.activePokemons.indexOf(pokemonInstance);
            if (index >= 0) {
                this.activePokemons.splice(index, 1);
            }
            const timeoutIndex = this.timeouts.indexOf(timeout);
            if (timeoutIndex >= 0) {
                this.timeouts.splice(timeoutIndex, 1);
            }
        }, 10000);
        this.timeouts.push(timeout);
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
        for (const timeout of this.timeouts) {
            clearTimeout(timeout);
        }
        this.activePokemons = [];
    }
}
