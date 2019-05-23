import {PokemonType} from './pokemon-types';
import {Move} from '../move/move';
import {MoveResult} from '../move/move-result';
import {AttackLog} from '../battle/attack-log';
import {BehaviorSubject, Observable} from 'rxjs';

export class Pokemon {
  public Name: string;
  public Speed: number;
  public Hp: number;
  public MaxHp: number;
  private refHp: number;
  public XpBeforeNextLevel: number;
  public Xp: number;
  public Level: number;
  public Moves: Move[];
  public Types: PokemonType[];

  public isAttacked = false;
  public isAttacking = false;
  public isCritic = false;


  constructor(pokemonName: string, speed: number, referenceHp: number, level: number, types: PokemonType[]) {
    this.Name = pokemonName;
    this.Speed = speed;
    this.refHp = referenceHp;
    this.setLevel(level);
    this.Types = types;
    this.Moves = [];
  }

  setLevel(newLevel: number) {
    this.MaxHp = Math.ceil(this.refHp * (newLevel / 20)) + this.refHp;
    this.Hp = this.MaxHp;
    this.Level = newLevel;
  }

  public isDie(): boolean {
    return this.Hp <= 0;
  }

  public hasMove(move: Move): boolean {
    return this.Moves.indexOf(move) !== -1;
  }

  public isStrongAgainstEnemy(secondPokemonType: PokemonType[]) {
    for (const typeFirstPokemon of this.Types) {
      for (const typeSecondPokemon of secondPokemonType) {
        if (typeFirstPokemon === PokemonType.fire && typeSecondPokemon === PokemonType.water) {
          this.isCritic = true;
          return true;
        } else if (typeFirstPokemon === PokemonType.grass && typeSecondPokemon === PokemonType.water) {
          this.isCritic = true;
          return true;
        } else if (typeFirstPokemon === PokemonType.water && typeSecondPokemon === PokemonType.fire) {
          this.isCritic = true;
          return true;
        } else if (typeFirstPokemon === PokemonType.flying && typeSecondPokemon === PokemonType.grass) {
          this.isCritic = true;
          return true;
        } else if (typeFirstPokemon === PokemonType.ground && typeSecondPokemon === PokemonType.poison) {
          this.isCritic = true;
          return true;
        } else if (typeFirstPokemon === PokemonType.bug && typeSecondPokemon === PokemonType.grass) {
          this.isCritic = true;
          return true;
        } else if (typeFirstPokemon === PokemonType.electric && typeSecondPokemon === PokemonType.water) {
          return this.isCritic = true;
        }
        return false;
      }
    }
  }

  // tslint:disable-next-line:max-line-length
  public applyMove(enemy: Pokemon, moveToExecute: Move, generatedAccuracy: number, logger: (log: AttackLog) => void): Observable<MoveResult> {
    const result = new BehaviorSubject<MoveResult>(MoveResult.WaitMove);
    if (!moveToExecute || !this.hasMove(moveToExecute)) {
      logger(AttackLog.skipRound(this));
      result.next(MoveResult.NoMove);
      return result;
    }
    let finalPv;
    if (generatedAccuracy <= moveToExecute.Accuracy) {
      this.isAttacking = true;
      enemy.isAttacked = true;
      finalPv = enemy.Hp - Math.ceil(moveToExecute.Power * (this.Level / 100));
      if (this.isStrongAgainstEnemy(enemy.Types)) {
        finalPv *= 2;
      }
      if (finalPv <= 0) {
        finalPv = 0;
      }
      const damageDealt = enemy.Hp - finalPv;
      enemy.Hp = finalPv;
      logger(AttackLog.attack(this, enemy, moveToExecute, damageDealt, this.isCritic));
      setTimeout(() => {
        this.isAttacking = false;
        enemy.isAttacked = false;
        result.next(MoveResult.MoveSuccess);
      }, 1000);
      return result;
    }
    logger(AttackLog.failAttack(this, moveToExecute));
    result.next(MoveResult.MoveFails);
    return result;
  }

  getXpPercents() {
    return this.Xp * 100 / this.XpBeforeNextLevel;
  }

  getHpPercents() {
    return this.Hp * 100 / this.MaxHp;
  }

  getHpColor() {
    const currentPercent = this.getHpPercents();
    if (currentPercent <= 20) {
      return 'bg-danger';
    } else if (currentPercent <= 50) {
      return 'bg-warning';
    }
    return 'bg-success';
  }

  regenerate() {
    this.Hp = this.MaxHp;
  }
}
