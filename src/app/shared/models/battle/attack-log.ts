import { Pokemon } from '../pokemon/pokemon';

export class AttackLog {
  public attacker: Pokemon;
  public enemy: Pokemon;
  public damage: number;
  public isKill: boolean;

  constructor(attacker: Pokemon, enemy: Pokemon, damage: number, isKill: boolean) {
    this.attacker = attacker;
    this.enemy = enemy;
    this.damage = damage;
    this.isKill = isKill;
  }
}
