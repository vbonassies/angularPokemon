export class Move {
    public Name: string;
    public Accuracy: number;
    public Power: number;

    constructor(name: string, accuracy: number, damage: number) {
        this.Name = name;
        this.Accuracy = accuracy;
        this.Power = damage;
    }
}
