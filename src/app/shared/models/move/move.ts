export class Move {
    public Name: string;
    public Description: string;
    public Accuracy: number;
    public Damage: number;

    constructor(name: string, description: string, accuracy: number, damage: number)
    {
        this.Name = name;
        this.Description = description;
        this.Accuracy = accuracy;
        this.Damage = damage;
    }
}