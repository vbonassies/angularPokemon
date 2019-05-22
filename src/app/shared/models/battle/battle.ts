import { Pokemon } from '../pokemon/pokemon';
import { Move } from '../move/move';
import { MoveResult } from '../move/move-result';
import { Error } from 'tslint/lib/error';
import { AttackLog } from './attack-log';

export class Battle {
  public FirstPokemon: Pokemon;
  public SecondPokemon: Pokemon;
  public Round: number;
  public Winner: Pokemon;
  public logs: AttackLog[] = [];

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
    const rightPokemon = pokemon === this.FirstPokemon ? this.FirstPokemon : this.SecondPokemon;
    const rightMoveName = pokemon === this.FirstPokemon ? firstPokemonMoveName : secondPokemonMoveName;
    return rightPokemon.Moves.find(mv => mv.Name === rightMoveName);
  }

  public logger(log: AttackLog): void {
    this.logs.push(log);
  }

  public launchTurn(firstPokemonMoveName: string, secondPokemonMoveName: string, firstPlayerAccuracy: number,
                    secondPlayerAccuracy: number): Pokemon {
    if (this.isBattleEnded()) {
      throw `This battle is already ended and was won by ${this.Winner.Name}`;
    }
    this.Round++;
    // this.logger(`Starting round ${this.Round}`);
    const firstAttacker = this.getNextTurnFirstAttacker();
    const secondAttacker = this.FirstPokemon === firstAttacker ? this.SecondPokemon : this.FirstPokemon;
    const firstAttackerMove = this.getMove(firstAttacker, firstPokemonMoveName, secondPokemonMoveName);
    const secondAttackerMove = this.getMove(secondAttacker, firstPokemonMoveName, secondPokemonMoveName);
    if (firstAttacker.applyMove(secondAttacker, firstAttackerMove, firstPlayerAccuracy, (log) => this.logger(log)) === MoveResult.MoveSuccess
    && secondAttacker.isDie()) {
      this.Winner = firstAttacker;
      this.logger(AttackLog.kill(firstAttacker, secondAttacker));
      return firstAttacker;
    }
    if (secondAttacker.applyMove(firstAttacker, secondAttackerMove, secondPlayerAccuracy, (log) => this.logger(log)) === MoveResult.MoveSuccess
    && firstAttacker.isDie()) {
      this.Winner = secondAttacker;
      this.logger(AttackLog.kill(firstAttacker, secondAttacker));
      return secondAttacker;
    }
    return null;
  }
}
