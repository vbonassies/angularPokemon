import {Component, OnInit} from '@angular/core';
import {Battle} from '../../shared/models/battle/battle';
import {ActivatedRoute, Router} from '@angular/router';
import {PokedexService} from '../../shared/services/pokedex.service';
import {Pokemon} from "../../shared/models/pokemon/pokemon";

@Component({
    templateUrl: './battle.component.html',
    styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

    battle: Battle;

    constructor(private route: ActivatedRoute, private router: Router, private pokedex: PokedexService) {

    }

    public static getEnemyLevel(userPokemon: Pokemon, rand: () => number = Math.random) {
        const maxOpponentLevel = Math.min(userPokemon.Level + 5, 99);
        const randomLevel = Math.floor(rand() * maxOpponentLevel);
        return Math.max(randomLevel, userPokemon.Level - 5);
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.pokedex.isPokedexInitialized().subscribe(res => {
                if (res) {
                    const userPokemon = this.pokedex.getPokemon(params.pokemonName);
                    const opponentLevel = BattleComponent.getEnemyLevel(userPokemon, Math.random);
                    const computerPokemon = this.pokedex.getRandomPokemon(opponentLevel);
                    if (!userPokemon || !computerPokemon) {
                        this.router.navigate(['']);
                        return;
                    }
                    this.battle = new Battle(
                        userPokemon,
                        computerPokemon);
                }
            });
        });
    }


}
