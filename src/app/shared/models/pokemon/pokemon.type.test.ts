import {PokemonType} from './pokemon-types';
import {Pokemon} from './pokemon';

let firstPokemon: Pokemon;
let firstPokemonName: string;
let firstPokemonSpeed: number;
let firstPokemonType: PokemonType;
let secondPokemonType: PokemonType[];

beforeEach(async () => {
    firstPokemonName = 'PokeOne';
    firstPokemonSpeed = 90;
    firstPokemonType = PokemonType.electric;
    secondPokemonType = [PokemonType.water];
});

test('Pokemon should be stronger electric vs water', () => {
    firstPokemon = new Pokemon(firstPokemonName, firstPokemonSpeed, 100, 1, [firstPokemonType]);
    expect(firstPokemon.isStrongAgainstEnemy(secondPokemonType)).toBe(true);
});


test('Pokemon NOT should be stronger fire vs water', () => {
    firstPokemonType = PokemonType.fire;
    secondPokemonType = [PokemonType.water];
    firstPokemon = new Pokemon(firstPokemonName, firstPokemonSpeed, 100, 1, [firstPokemonType]);
    expect(firstPokemon.isStrongAgainstEnemy(secondPokemonType)).toBe(false);
});

test('Pokemon should be stronger grass vs water', () => {
    firstPokemonType = PokemonType.grass;
    secondPokemonType = [PokemonType.water];
    firstPokemon = new Pokemon(firstPokemonName, firstPokemonSpeed, 100, 1, [firstPokemonType]);
    expect(firstPokemon.isStrongAgainstEnemy(secondPokemonType)).toBe(true);
});

test('Pokemon should be stronger water vs fire', () => {
    firstPokemonType = PokemonType.water;
    secondPokemonType = [PokemonType.fire];
    firstPokemon = new Pokemon(firstPokemonName, firstPokemonSpeed, 100, 1, [firstPokemonType]);
    expect(firstPokemon.isStrongAgainstEnemy(secondPokemonType)).toBe(true);
});

test('Pokemon should be stronger fire vs grass', () => {
    firstPokemonType = PokemonType.fire;
    secondPokemonType = [PokemonType.grass];
    firstPokemon = new Pokemon(firstPokemonName, firstPokemonSpeed, 100, 1, [firstPokemonType]);
    expect(firstPokemon.isStrongAgainstEnemy(secondPokemonType)).toBe(true);
});

test('Pokemon should be stronger flying vs grass', () => {
    firstPokemonType = PokemonType.flying;
    secondPokemonType = [PokemonType.grass];
    firstPokemon = new Pokemon(firstPokemonName, firstPokemonSpeed, 100, 1, [firstPokemonType]);
    expect(firstPokemon.isStrongAgainstEnemy(secondPokemonType)).toBe(true);
});

test('Pokemon should be stronger ground vs poison', () => {
    firstPokemonType = PokemonType.ground;
    secondPokemonType = [PokemonType.poison];
    firstPokemon = new Pokemon(firstPokemonName, firstPokemonSpeed, 100, 1, [firstPokemonType]);
    expect(firstPokemon.isStrongAgainstEnemy(secondPokemonType)).toBe(true);
});

test('Pokemon should be stronger bug vs grass', () => {
    firstPokemonType = PokemonType.bug;
    secondPokemonType = [PokemonType.grass];
    firstPokemon = new Pokemon(firstPokemonName, firstPokemonSpeed, 100, 1, [firstPokemonType]);
    expect(firstPokemon.isStrongAgainstEnemy(secondPokemonType)).toBe(true);
});

test('Pokemon should be stronger flying,bug vs grass', () => {
    firstPokemonType = PokemonType.bug;
    secondPokemonType = [PokemonType.flying, PokemonType.grass];
    firstPokemon = new Pokemon(firstPokemonName, firstPokemonSpeed, 100, 1, [firstPokemonType]);
    expect(firstPokemon.isStrongAgainstEnemy(secondPokemonType)).toBe(true);
});
