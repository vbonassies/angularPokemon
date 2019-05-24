import { Pokemon } from '../pokemon/pokemon';
import { Move } from '../move/move';

export class AttackLog {
  public attacker: Pokemon;
  public enemy: Pokemon;
  public damage: number;
  public xpWon: number;
  public isKill: boolean;
  public levelUp: boolean;
  public attackFailed: boolean;
  public skipRound: boolean;
  public move: Move;
  public message: string;
  public critic: boolean;

  private constructor(attacker: Pokemon, enemy: Pokemon, move: Move, damage: number, attackFailed: boolean,
                      skipRound: boolean, isKill: boolean, message: string, critic: boolean, newLevel: boolean, xpWon: number) {
    this.attacker = attacker;
    this.enemy = enemy;
    this.move = move;
    this.damage = damage;
    this.attackFailed = attackFailed;
    this.skipRound = skipRound;
    this.isKill = isKill;
    this.levelUp = newLevel;
    this.message = message;
    this.critic = critic;
    this.xpWon = xpWon;
  }

  static skipRound(attacker: Pokemon) {
    return new AttackLog(attacker, null, null, 0, false, true, false, null, null, false, null);
  }

  static failAttack(attacker: Pokemon, move: Move) {
    return new AttackLog(attacker, null, move, 0, true, false, false, null, null, false, null);
  }

  static attack(attacker: Pokemon, enemy: Pokemon, move: Move, damage: number, critic: boolean) {
    return new AttackLog(attacker, enemy, move, damage, false, false, false, null, critic, false, null);
  }

  static kill(attacker: Pokemon, enemy: Pokemon) {
    return new AttackLog(attacker, enemy, null, 0, false, false, true, null, null, false, null);
  }

  static message(log: string) {
    return new AttackLog(null, null, null, 0, false, false, false, log, null, false, null);
  }

  static levelUp(pokemon: Pokemon) {
    return new AttackLog(pokemon, null, null, 0, false, false, false, null, null, true, null);
  }

  static wonXp(pokemon: Pokemon, xpWon: number) {
    return new AttackLog(pokemon, null, null, 0, false, false, false, null, null, false, xpWon);
  }
}
