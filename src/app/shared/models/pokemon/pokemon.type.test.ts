import {PokemonType} from './pokemon-types';
import {Pokemon} from './pokemon';

let firstPokemon: Pokemon;

beforeEach(async () => {
    const firstPokemonName = 'PokeOne';
    const firstPokemonSpeed = 90;
    firstPokemon = new Pokemon(firstPokemonName, firstPokemonSpeed, 100, 1, []);
});

test('Pokemon should be stronger electric vs water', () => {
    firstPokemon.Types = [PokemonType.electric];
    expect(firstPokemon.isStrongAgainstEnemy([PokemonType.water])).toBe(true);
});


test('Pokemon NOT should be stronger fire vs water', () => {
    firstPokemon.Types = [PokemonType.fire];
    expect(firstPokemon.isStrongAgainstEnemy([PokemonType.water])).toBe(false);
});

test('Pokemon should be stronger grass vs water', () => {
    firstPokemon.Types = [PokemonType.grass];
    expect(firstPokemon.isStrongAgainstEnemy([PokemonType.water])).toBe(true);
});

test('Pokemon should be stronger water vs fire', () => {
    firstPokemon.Types = [PokemonType.water];
    expect(firstPokemon.isStrongAgainstEnemy([PokemonType.fire])).toBe(true);
});

test('Pokemon should be stronger fire vs grass', () => {
    firstPokemon.Types = [PokemonType.fire];
    expect(firstPokemon.isStrongAgainstEnemy([PokemonType.grass])).toBe(true);
});

test('Pokemon should be stronger flying vs grass', () => {
    firstPokemon.Types = [PokemonType.flying];
    expect(firstPokemon.isStrongAgainstEnemy([PokemonType.grass])).toBe(true);
});

test('Pokemon should be stronger ground vs poison', () => {
    firstPokemon.Types = [PokemonType.ground];
    expect(firstPokemon.isStrongAgainstEnemy([PokemonType.poison])).toBe(true);
});

test('Pokemon should be stronger bug vs grass', () => {
    firstPokemon.Types = [PokemonType.bug];
    expect(firstPokemon.isStrongAgainstEnemy([PokemonType.grass])).toBe(true);
});

test('Pokemon should be stronger flying,bug vs grass', () => {
    firstPokemon.Types = [PokemonType.bug];
    expect(firstPokemon.isStrongAgainstEnemy([PokemonType.flying, PokemonType.grass])).toBe(true);
});
