import {PokemonType} from './pokemon-types';
import {Move} from '../move/move';
import {MoveResult} from '../move/move-result';

export class Pokemon {
    public Name: string;
    public Speed: number;
    public Pv: number;
    public Moves: Move[];
    public Type: PokemonType;


    constructor(pokemonName: string, speed: number, moves: Move[], type: PokemonType) {
        this.Name = pokemonName;
        this.Speed = speed;
        this.Moves = moves;
        this.Pv = 100;
        this.Type = type;
    }

    public isDie(): boolean {
        return this.Pv <= 0;
    }

    public hasMove(move: Move): boolean {
        return this.Moves.indexOf(move) !== -1;
    }

    public isStrongAgainstEnemy(secondPokemonType: PokemonType) {
        if (this.Type === PokemonType.Fire && secondPokemonType === PokemonType.Water) {
            return true;
        } else if (this.Type === PokemonType.Grass && secondPokemonType === PokemonType.Water) {
            return true;
        } else if (this.Type === PokemonType.Water && secondPokemonType === PokemonType.Fire) {
            return true;
        } else { return this.Type === PokemonType.Electric && secondPokemonType === PokemonType.Water; }
    }

    public applyMove(enemy: Pokemon, moveToExecute: Move, generatedAccuracy: number): MoveResult {
        if (!moveToExecute || !this.hasMove(moveToExecute)) {
            console.log(`${this.Name} has nothing to do..`);
            return MoveResult.NoMove;
        }
        let finalPv;
        if (generatedAccuracy <= moveToExecute.Accuracy) {

            if (this.isStrongAgainstEnemy(enemy.Type)) {
                finalPv = enemy.Pv - moveToExecute.Damage * 2;

            } else {
                finalPv = enemy.Pv - moveToExecute.Damage;
            }
            if (finalPv <= 0) {
                finalPv = 0;
            }
            enemy.Pv = finalPv;
            console.log(`${this.Name} has attacked with ${moveToExecute.Name}!. ${moveToExecute.Damage} infliged damage`);
            return MoveResult.MoveSuccess;
        }
        console.log(`${this.Name} fails its attack..`);
        return MoveResult.MoveFails;
    }
}