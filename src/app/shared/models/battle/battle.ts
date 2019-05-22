import {Pokemon} from '../pokemon/pokemon';
import {Move} from '../move/move';
import {MoveResult} from '../move/move-result';
import {Error} from 'tslint/lib/error';

export class Battle {
    public FirstPokemon: Pokemon;
    public SecondPokemon: Pokemon;
    public Round: number;
    public Winner: Pokemon;
    public logs: string[] = [];

    constructor(firstPokemon: Pokemon, secondPokemon: Pokemon) {
        this.FirstPokemon = firstPokemon;
        this.SecondPokemon = secondPokemon;
        this.Round = 0;
    }

    public isBattleEnded(): boolean {
        return this.Winner !== undefined;
    }

    public getNextTurnFirstAttacker(): Pokemon {
        return this.FirstPokemon.Speed >= this.SecondPokemon.Speed ? this.FirstPokemon : this.SecondPokemon;
    }

    public getMove(pokemon: Pokemon, firstPokemonMoveName: string, secondPokemonMoveName: string): Move {
        const rightPokemon =  pokemon === this.FirstPokemon ? this.FirstPokemon : this.SecondPokemon;
        const rightMoveName =  pokemon === this.FirstPokemon ? firstPokemonMoveName : secondPokemonMoveName;
        return rightPokemon.Moves.find(mv => mv.Name === rightMoveName);
    }

    public logger(log: string): void {
        this.logs.push(log);
    }

    public launchTurn(firstPokemonMoveName: string, secondPokemonMoveName: string, firstPlayerAccuracy: number,
                      secondPlayerAccuracy: number): Pokemon {
        if (this.isBattleEnded()) {
            throw new Error(`This battle is already ended and was won by ${this.Winner.Name}`);
        }
        this.Round++;
        this.logger(`Starting round ${this.Round}`);
        const firstAttacker = this.getNextTurnFirstAttacker();
        const secondAttacker = this.FirstPokemon === firstAttacker ? this.SecondPokemon : this.FirstPokemon;
        const firstAttackerMove = this.getMove(firstAttacker, firstPokemonMoveName, secondPokemonMoveName);
        const secondAttackerMove = this.getMove(secondAttacker, firstPokemonMoveName, secondPokemonMoveName);
        if (firstAttacker.applyMove(secondAttacker, firstAttackerMove, firstPlayerAccuracy, this.logger) === MoveResult.MoveSuccess
            && secondAttacker.isDie()) {
            this.Winner = firstAttacker;
            console.log(`${firstAttacker.Name} win`);
            return firstAttacker;
        }
        if (secondAttacker.applyMove(firstAttacker, secondAttackerMove, secondPlayerAccuracy, this.logger) === MoveResult.MoveSuccess
            && firstAttacker.isDie()) {
            this.Winner = secondAttacker;
            console.log(`${secondAttacker.Name} win`);
            return secondAttacker;
        }
        this.logger(`End of roud ${this.Round}. ${firstAttacker.Name} has ${firstAttacker.Pv} PVs and ${secondAttacker.Name} has
            ${secondAttacker.Pv} PVs.`);
        return null;
    }
}
