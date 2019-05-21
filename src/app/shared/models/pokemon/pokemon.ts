import {Move} from "../move/move";
import {MoveResult} from "../move/move-result";

export class Pokemon {
    public Name: string;
    public Speed: number;
    public Pv: number;
    public Moves: Move[];

    constructor(pokemonName: string, speed: number, moves: Move[]) {
        this.Name = pokemonName;
        this.Speed = speed;
        this.Moves = moves;
        this.Pv = 100;
    }

    public isDie() : boolean {
        return this.Pv <= 0;
    }

    public hasMove(move: Move): boolean {
        return this.Moves.indexOf(move) !== -1;
    }

    public applyMove(enemy: Pokemon, moveToExecute: Move, generatedAccuracy: number): MoveResult {
        if (moveToExecute == undefined || !this.hasMove(moveToExecute)) {
            console.log(`${this.Name} has nothing to do..`);
            return MoveResult.NoMove;
        }
        if (generatedAccuracy <= moveToExecute.Accuracy) {
            let finalPv = enemy.Pv - moveToExecute.Damage;
            if(finalPv <= 0)
            {
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