import {PokemonType} from './pokemon-types';
import {Move} from '../move/move';
import {MoveResult} from '../move/move-result';
import {AttackLog} from '../battle/attack-log';
import {BehaviorSubject, Observable} from 'rxjs';

export class Pokemon {
  public static DamageSensivity = 5;

  public Name: string;
  public Speed: number;
  public Hp: number;
  public MaxHp: number;
  public ReferenceHp: number;
  public XpBeforeNextLevel: number;
  public Xp: number;
  public Level: number;
  public Moves: Move[];
  public Types: PokemonType[];

  public isAttacked = false;
  public isAttacking = false;


  constructor(pokemonName: string, speed: number, referenceHp: number, level: number, types: PokemonType[]) {
    this.Name = pokemonName;
    this.Speed = speed;
    this.ReferenceHp = referenceHp;
    this.setLevel(level);
    this.Types = types;
    this.Moves = [];
  }

  setLevel(newLevel: number) {
    this.MaxHp = Math.ceil(this.ReferenceHp * (newLevel / 20)) + this.ReferenceHp;
    this.Hp = this.MaxHp;
    this.Xp = 0;
    this.XpBeforeNextLevel = this.MaxHp;
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
          return true;
        } else if (typeFirstPokemon === PokemonType.grass && typeSecondPokemon === PokemonType.water) {
          return true;
        } else if (typeFirstPokemon === PokemonType.water && typeSecondPokemon === PokemonType.fire) {
          return true;
        } else if (typeFirstPokemon === PokemonType.flying && typeSecondPokemon === PokemonType.grass) {
          return true;
        } else if (typeFirstPokemon === PokemonType.ground && typeSecondPokemon === PokemonType.poison) {
          return true;
        } else if (typeFirstPokemon === PokemonType.bug && typeSecondPokemon === PokemonType.grass) {
          return true;
        } else if (typeFirstPokemon === PokemonType.electric && typeSecondPokemon === PokemonType.water) {
          return true;
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
      const damage = Math.ceil(moveToExecute.Power * (this.Level / 100)) + Pokemon.DamageSensivity;
      finalPv = enemy.Hp - damage;
      const isCritic = this.isStrongAgainstEnemy(enemy.Types);
      if (isCritic) {
        finalPv -= damage;
      }
      if (finalPv <= 0) {
        finalPv = 0;
      }
      enemy.Hp = finalPv;
      logger(AttackLog.attack(this, enemy, moveToExecute, damage, isCritic));
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

  tryLevelUp(ennemy: Pokemon, logger: BehaviorSubject<AttackLog>) {
    let wonXp = Math.ceil(ennemy.Level * 2);
    logger.next(AttackLog.wonXp(this, wonXp));
    if (wonXp >= (this.XpBeforeNextLevel - this.Xp)) {
      wonXp -= (this.XpBeforeNextLevel - this.Xp);
      if (this.Level < 99) {
        logger.next(AttackLog.levelUp(this));
        this.setLevel(this.Level + 1);
      } else {
        wonXp = (this.XpBeforeNextLevel - this.Xp);
      }
    }
    return;
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
