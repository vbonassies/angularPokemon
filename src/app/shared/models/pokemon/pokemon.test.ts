import {Pokemon} from "./pokemon";
import {Move} from "../move/move";
import {MoveResult} from "../move/move-result";

test('Pokemon is correctly constructed', () => {
    const pokemonName = 'Pikachu';
    const pokemonSpeed = 90;
    const pokemonMoveFirst = new Move("mega-punch", "MegaPunch applyMove!", 95, 15);
    const pokemonMoveSecond = new Move("Sleep", "Useless applyMove", 100, 0);
    const newPokemon = new Pokemon(pokemonName, pokemonSpeed, [pokemonMoveFirst, pokemonMoveSecond]);
    expect(newPokemon.Name).toBe(pokemonName);
    expect(newPokemon.Speed).toBe(pokemonSpeed);
    expect(newPokemon.Pv).toBe(100);
    const gettedMoves = newPokemon.Moves;
    expect(gettedMoves.length).toBe(2);
    expect(gettedMoves).toContain(pokemonMoveFirst);
    expect(gettedMoves).toContain(pokemonMoveSecond);
});

test('isDie should return true when PV <= 0', () => {
    const pokemonName = 'Pikachu';
    const pokemonSpeed = 90;
    const newPokemon = new Pokemon(pokemonName, pokemonSpeed, null);

    newPokemon.Pv = 0;
    expect(newPokemon.isDie()).toBe(true);

    newPokemon.Pv = -1;
    expect(newPokemon.isDie()).toBe(true);

    newPokemon.Pv = 1;
    expect(newPokemon.isDie()).toBe(false);
});

test('hasMove return true when pokemon has the move', () => {
    const pokemonName = 'Pikachu';
    const pokemonSpeed = 90;
    const pokemonMove = new Move("ATestMove", "Test description", 0,0);
    const fakeMove = new Move("AFakeTestMove", "Fake move not in list", 0,0);
    const newPokemon = new Pokemon(pokemonName, pokemonSpeed, [pokemonMove]);

    expect(newPokemon.hasMove(pokemonMove)).toBe(true);
    expect(newPokemon.hasMove(fakeMove)).toBe(false);
});

test('undefined move must return false', () => {
    const pokemonName = 'Pikachu';
    const pokemonSpeed = 90;
    const pokemonMove = new Move("ATestMove", "Test description", 0,0);
    const newPokemon = new Pokemon(pokemonName, pokemonSpeed, [pokemonMove]);

    expect(newPokemon.applyMove(newPokemon, null, 1)).toBe(MoveResult.NoMove);
    expect(newPokemon.Pv).toBe(100);
});

test('If generated accuracy is greater than move accuracy, applyMove must fail', () => {
    const pokemonName = 'Pikachu';
    const pokemonSpeed = 90;
    const pokemonMove = new Move("ATestMove", "Test description", 15,10);
    const newPokemon = new Pokemon(pokemonName, pokemonSpeed, [pokemonMove]);

    expect(newPokemon.applyMove(newPokemon, pokemonMove, 99)).toBe(MoveResult.MoveFails);
    expect(newPokemon.Pv).toBe(100);
});

test('If generated accuracy is less than move accuracy, applyMove must fail, applyMove must success', () => {
    const pokemonName = 'Pikachu';
    const pokemonSpeed = 90;
    const pokemonMove = new Move("ATestMove", "Test description", 15,10);
    const newPokemon = new Pokemon(pokemonName, pokemonSpeed, [pokemonMove]);

    let expectedNewPv = newPokemon.Pv - pokemonMove.Damage;
    expect(newPokemon.applyMove(newPokemon, pokemonMove, 2)).toBe(MoveResult.MoveSuccess);
    expect(newPokemon.Pv).toBe(expectedNewPv);
});

test('If generated accuracy is equals than move accuracy, applyMove must fail, applyMove must success', () => {
    const pokemonName = 'Pikachu';
    const pokemonSpeed = 90;
    const pokemonMove = new Move("ATestMove", "Test description", 15,10);
    const newPokemon = new Pokemon(pokemonName, pokemonSpeed, [pokemonMove]);

    let expectedNewPv = newPokemon.Pv - pokemonMove.Damage;
    expect(newPokemon.applyMove(newPokemon, pokemonMove, 15)).toBe(MoveResult.MoveSuccess);
    expect(newPokemon.Pv).toBe(expectedNewPv);
});