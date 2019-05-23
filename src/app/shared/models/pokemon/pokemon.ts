import {PokemonType} from './pokemon-types';
import {Move} from '../move/move';
import {MoveResult} from '../move/move-result';
import {AttackLog} from '../battle/attack-log';

export class Pokemon {
  public Name: string;
  public Speed: number;
  public Hp: number;
  public MaxHp: number;
  public XpBeforeNextLevel: number;
  public Xp: number;
  public Moves: Move[];
  public Type: PokemonType[];

  public isAttacked = false;
  public isAttacking = false;


  constructor(pokemonName: string, speed: number, moves: Move[], type: PokemonType[]) {
    this.Name = pokemonName;
    this.Speed = speed;
    this.Moves = moves;
    this.Hp = 100;
    this.MaxHp = 100;
    this.XpBeforeNextLevel = 100;
    this.Xp = 100;
    this.Type = type;
  }

  public isDie(): boolean {
    return this.Hp <= 0;
  }

  public hasMove(move: Move): boolean {
    return this.Moves.indexOf(move) !== -1;
  }

  public isStrongAgainstEnemy(secondPokemonType: PokemonType[]) {
    for (const typeFirstPokemon of this.Type) {
      for (const typeSecondPokemon of secondPokemonType) {
        if (typeFirstPokemon === PokemonType.Fire && typeSecondPokemon === PokemonType.Water) {
          return true;
        } else if (typeFirstPokemon === PokemonType.Grass && typeSecondPokemon === PokemonType.Water) {
          return true;
        } else if (typeFirstPokemon === PokemonType.Water && typeSecondPokemon === PokemonType.Fire) {
          return true;
        } else if (typeFirstPokemon === PokemonType.Flying && typeSecondPokemon === PokemonType.Grass) {
          return true;
        } else {
          return typeFirstPokemon === PokemonType.Electric && typeSecondPokemon === PokemonType.Water;
        }
      }
    }
  }

  public applyMove(enemy: Pokemon, moveToExecute: Move, generatedAccuracy: number, logger: (log: AttackLog) => void): MoveResult {
    if (!moveToExecute || !this.hasMove(moveToExecute)) {
      logger(AttackLog.skipRound(this));
      return MoveResult.NoMove;
    }
    let finalPv;
    if (generatedAccuracy <= moveToExecute.Accuracy) {
      this.isAttacking = true;
      enemy.isAttacked = true;
      if (this.isStrongAgainstEnemy(enemy.Type)) {
        finalPv = enemy.Hp - moveToExecute.Damage * 2;
      } else {
        finalPv = enemy.Hp - moveToExecute.Damage;
      }
      if (finalPv <= 0) {
        finalPv = 0;
      }
      const damageDealt = finalPv - enemy.Hp;
      enemy.Hp = finalPv;
      this.isAttacking = false;
      enemy.isAttacked = false;
      logger(AttackLog.attack(this, enemy, moveToExecute, damageDealt));
      return MoveResult.MoveSuccess;
    }
    logger(AttackLog.failAttack(this, moveToExecute));
    return MoveResult.MoveFails;
  }
}
