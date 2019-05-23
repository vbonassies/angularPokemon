import {Pokemon} from './pokemon';
import {Move} from '../move/move';
import {MoveResult} from '../move/move-result';
import {PokemonType} from './pokemon-types';

function emptyLog() {
}

test('Pokemon is correctly constructed', () => {
    const pokemonName = 'Pikachu';
    const pokemonSpeed = 90;
    const type = PokemonType.electric;
    const pokemonMoveFirst = new Move('mega-punch', 95, 15);
    const pokemonMoveSecond = new Move('Sleep', 100, 0);
    const newPokemon = new Pokemon(pokemonName, pokemonSpeed, 100, 1, [type]);
    newPokemon.Moves = [pokemonMoveFirst, pokemonMoveSecond];
    expect(newPokemon.Name).toBe(pokemonName);
    expect(newPokemon.Speed).toBe(pokemonSpeed);
    expect(newPokemon.Hp).toBe(100);
    const gettedMoves = newPokemon.Moves;
    expect(gettedMoves.length).toBe(2);
    expect(gettedMoves).toContain(pokemonMoveFirst);
    expect(gettedMoves).toContain(pokemonMoveSecond);
});

test('isDie should return true when PV <= 0', () => {
    const pokemonName = 'Pikachu';
    const pokemonSpeed = 90;
    const type = PokemonType.electric;
    const newPokemon = new Pokemon(pokemonName, pokemonSpeed, 10, 1, []);

    newPokemon.Hp = 0;
    expect(newPokemon.isDie()).toBe(true);

    newPokemon.Hp = -1;
    expect(newPokemon.isDie()).toBe(true);

    newPokemon.Hp = 1;
    expect(newPokemon.isDie()).toBe(false);
});

test('hasMove return true when pokemon has the move', () => {
    const pokemonName = 'Pikachu';
    const pokemonSpeed = 90;
    const type = PokemonType.electric;
    const pokemonMove = new Move('ATestMove', 0, 0);
    const fakeMove = new Move('AFakeTestMove', 0, 0);
    const newPokemon = new Pokemon(pokemonName, pokemonSpeed, 10, 1, [type]);
    newPokemon.Moves = [pokemonMove];

    expect(newPokemon.hasMove(pokemonMove)).toBe(true);
    expect(newPokemon.hasMove(fakeMove)).toBe(false);
});

test('undefined move must return false', () => {
    const pokemonName = 'Pikachu';
    const pokemonSpeed = 90;
    const type = PokemonType.electric;
    const pokemonMove = new Move('ATestMove', 0, 0);
    const newPokemon = new Pokemon(pokemonName, pokemonSpeed, 100, 1, [type]);
    newPokemon.Moves = [pokemonMove];

    expect(newPokemon.applyMove(newPokemon, null, 1, emptyLog)).toBe(MoveResult.NoMove);
    expect(newPokemon.Hp).toBe(100);
});

test('If generated accuracy is greater than move accuracy, applyMove must fail', () => {
    const pokemonName = 'Pikachu';
    const pokemonSpeed = 90;
    const type = PokemonType.electric;
    const pokemonMove = new Move('ATestMove', 15, 10);
    const newPokemon = new Pokemon(pokemonName, pokemonSpeed, 100, 1, [type]);
    newPokemon.Moves = [pokemonMove];

    expect(newPokemon.applyMove(newPokemon, pokemonMove, 99, emptyLog)).toBe(MoveResult.MoveFails);
    expect(newPokemon.Hp).toBe(100);
});

test('If generated accuracy is less than move accuracy, applyMove must fail, applyMove must success', () => {
    const pokemonName = 'Pikachu';
    const pokemonSpeed = 90;
    const type = PokemonType.electric;
    const pokemonMove = new Move('ATestMove', 15, 10);
    const newPokemon = new Pokemon(pokemonName, pokemonSpeed, 100, 1, [type]);
    newPokemon.Moves = [pokemonMove];

    const expectedNewPv = newPokemon.Hp - pokemonMove.Power;
    expect(newPokemon.applyMove(newPokemon, pokemonMove, 2, emptyLog)).toBe(MoveResult.MoveSuccess);
    expect(newPokemon.Hp).toBe(expectedNewPv);
});

test('If generated accuracy is equals than move accuracy, applyMove must fail, applyMove must success', () => {
    const pokemonName = 'Pikachu';
    const pokemonSpeed = 90;
    const type = PokemonType.electric;
    const pokemonMove = new Move('ATestMove', 15, 10);
    const newPokemon = new Pokemon(pokemonName, pokemonSpeed, 100, 1, [type]);
    newPokemon.Moves = [pokemonMove];

    const expectedNewPv = newPokemon.Hp - pokemonMove.Power;
    expect(newPokemon.applyMove(newPokemon, pokemonMove, 15, emptyLog)).toBe(MoveResult.MoveSuccess);
    expect(newPokemon.Hp).toBe(expectedNewPv);
});
