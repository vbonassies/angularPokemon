import { Pokemon } from '../pokemon/pokemon';
import { Move } from '../move/move';

export class AttackLog {
  public attacker: Pokemon;
  public enemy: Pokemon;
  public damage: number;
  public isKill: boolean;
  public attackFailed: boolean;
  public skipRound: boolean;
  public move: Move;
  public message: string;

  private constructor(attacker: Pokemon, enemy: Pokemon, move: Move, damage: number, attackFailed: boolean,
                      skipRound: boolean, isKill: boolean, message: string) {
    this.attacker = attacker;
    this.enemy = enemy;
    this.move = move;
    this.damage = damage;
    this.attackFailed = attackFailed;
    this.skipRound = skipRound;
    this.isKill = isKill;
    this.message = message;
  }

  static skipRound(attacker: Pokemon) {
    return new AttackLog(attacker, null, null, 0, false, true, false, null);
  }

  static failAttack(attacker: Pokemon, move: Move) {
    return new AttackLog(attacker, null, move, 0, true, false, false, null);
  }

  static attack(attacker: Pokemon, enemy: Pokemon, move: Move, damage: number) {
    return new AttackLog(attacker, enemy, move, damage, false, false, false, null);
  }

  static kill(attacker: Pokemon, enemy: Pokemon) {
    return new AttackLog(attacker, enemy, null, 0, false, false, true, null);
  }

  static message(log: string) {
    return new AttackLog(null, null, null, 0, false, false, false, log);
  }
}
