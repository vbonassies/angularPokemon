import {PokemonDirection} from './pokemon-direction';

export class BackgroundPokemon {
    public Name: string;
    public Direction: PokemonDirection;
    public yPosition: number;

    constructor(Name: string, Direction: PokemonDirection, yPosition: number) {
        this.Name = Name;
        this.Direction = Direction;
        this.yPosition = yPosition;
    }
}
