import { Pokemon } from '../pokemon/pokemon';
import { Move } from '../move/move';
import { MoveResult } from '../move/move-result';
import { AttackLog } from './attack-log';
import {BehaviorSubject} from 'rxjs';

export class Battle {
  public FirstPokemon: Pokemon;
  public SecondPokemon: Pokemon;
  public Round: number;
  public Winner: Pokemon;

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

  public launchTurn(firstPokemonMoveName: string, secondPokemonMoveName: string, firstPlayerAccuracy: number,
                    secondPlayerAccuracy: number, logger: BehaviorSubject<AttackLog>): Pokemon {
    if (this.isBattleEnded()) {
      throw new Error(`This battle is already ended and was won by ${this.Winner.Name}`);
    }
    this.Round++;
    logger.next(AttackLog.message(`Starting round ${this.Round}`));
    const firstAttacker = this.getNextTurnFirstAttacker();
    const secondAttacker = this.FirstPokemon === firstAttacker ? this.SecondPokemon : this.FirstPokemon;
    const firstAttackerMove = this.getMove(firstAttacker, firstPokemonMoveName, secondPokemonMoveName);
    const secondAttackerMove = this.getMove(secondAttacker, firstPokemonMoveName, secondPokemonMoveName);
    // tslint:disable-next-line:max-line-length
    if (firstAttacker.applyMove(secondAttacker, firstAttackerMove, firstPlayerAccuracy, (log) => logger.next(log)) === MoveResult.MoveSuccess
    && secondAttacker.isDie()) {
      this.Winner = firstAttacker;
      logger.next(AttackLog.kill(firstAttacker, secondAttacker));
      return firstAttacker;
    }
    // tslint:disable-next-line:max-line-length
    if (secondAttacker.applyMove(firstAttacker, secondAttackerMove, secondPlayerAccuracy, (log) => logger.next(log)) === MoveResult.MoveSuccess
    && firstAttacker.isDie()) {
      this.Winner = secondAttacker;
      logger.next(AttackLog.kill(firstAttacker, secondAttacker));
      return secondAttacker;
    }
    return null;
  }
}
