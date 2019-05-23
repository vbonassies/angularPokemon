import {PokemonType} from './pokemon-types';
import {Move} from '../move/move';
import {MoveResult} from '../move/move-result';
import {AttackLog} from '../battle/attack-log';

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
        } else {
          return typeFirstPokemon === PokemonType.electric && typeSecondPokemon === PokemonType.water;
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
      finalPv = enemy.Hp - Math.ceil(moveToExecute.Power * (this.Level / 100));
      if (this.isStrongAgainstEnemy(enemy.Types)) {
        finalPv *= 2;
      }
      if (finalPv <= 0) {
        finalPv = 0;
      }
      const damageDealt = enemy.Hp - finalPv;
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
