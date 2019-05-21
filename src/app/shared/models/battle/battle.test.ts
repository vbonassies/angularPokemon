import {Pokemon} from "../pokemon/pokemon";
import {Battle} from "../battle/battle";
import {Move} from "../move/move";

const megaPuchMove = new Move("Mega Punch", "Mega Punch Description", 85, 20);
const rollingStonesMove = new Move("Rolling Stones", "Rolling Stones Description", 80, 10);
const canonAOMove = new Move("Canon O", "Canon O Description", 10, 2);
const pikachu = new Pokemon('Pikachu', 90, [megaPuchMove]);
const carapuce = new Pokemon('Carapuce', 43, [rollingStonesMove, canonAOMove]);


test('Battle is correctly constructed', () => {
    const battle = new Battle(pikachu, carapuce);
    expect(battle.FirstPokemon).toBe(pikachu);
    expect(battle.SecondPokemon).toBe(carapuce);
    expect(battle.Round).toBe(0);
    expect(battle.Winner).toBe(undefined);
});

test('First attacker is the fastest pokemon (firstPokemon fastest)', () =>  {
    const battle = new Battle(pikachu, carapuce);
    expect(battle.getNextTurnFirstAttacker()).toBe(pikachu);
});

test('First attacker is the fastest pokemon (secondPokemon fastest)', () =>  {
    const battle = new Battle(carapuce, pikachu);
    expect(battle.getNextTurnFirstAttacker()).toBe(pikachu);
});

test('getMove should return the move regarding attackers order (secondPokemon as firstAttacker)', () =>  {
    const battle = new Battle(carapuce, pikachu);
    const carapuceMove = carapuce.Moves[0];
    const pikachuMove = pikachu.Moves[0];
    expect(battle.getMove(pikachu, carapuceMove.Name, pikachuMove.Name)).toBe(pikachuMove);
    expect(battle.getMove(carapuce, carapuceMove.Name, pikachuMove.Name)).toBe(carapuceMove);
});

test('getMove should return the move regarding attackers order (firstPokemon as firstAttacker)', () =>  {
    const battle = new Battle(pikachu, carapuce);
    const carapuceMove = carapuce.Moves[0];
    const pikachuMove = pikachu.Moves[0];
    expect(battle.getMove(pikachu, pikachuMove.Name, carapuceMove.Name)).toBe(pikachuMove);
    expect(battle.getMove(carapuce, pikachuMove.Name, carapuceMove.Name)).toBe(carapuceMove);
});

test('Test if first pokemon win during launchTurn', () =>  {
    const pikaUlti = pikachu;
    const pikachuUltiMove = new Move("UltiMove", "One shot for test", 100, 100);
    pikaUlti.Moves.push(pikachuUltiMove);
    const battle = new Battle(pikaUlti, carapuce);
    const carapuceMove = carapuce.Moves[0];
    expect(battle.launchTurn(pikachuUltiMove.Name, carapuceMove.Name, 10, 10)).toBe(pikaUlti);
    expect(battle.Round).toBe(1);
    expect(battle.Winner).toBe(pikaUlti)
});

test('Test if second pokemon win during launchTurn', () =>  {
    const pikaUlti = pikachu;
    const pikachuUltiMove = new Move("UltiMove", "One shot for test", 100, 100);
    pikaUlti.Moves.push(pikachuUltiMove);
    const battle = new Battle(carapuce, pikaUlti);
    const carapuceMove = carapuce.Moves[0];
    expect(battle.launchTurn(carapuceMove.Name, pikachuUltiMove.Name, 10, 10)).toBe(pikaUlti);
    expect(battle.Round).toBe(1);
    expect(battle.Winner).toBe(pikaUlti);
});

test('Test that launchTurn on ended battle throws', () =>  {
    const battle = new Battle(carapuce, pikachu);
    const carapuceMove = carapuce.Moves[0];
    const pikachuMove = pikachu.Moves[0];
    battle.Winner = carapuce;
    expect(() => battle.launchTurn(carapuceMove.Name, pikachuMove.Name, 10, 10)).toThrowError(`This battle is already ended and was won by ${carapuce.Name}`);
});

test('Test is battle ended if winner is set', () =>  {
    const battle = new Battle(carapuce, pikachu);
    expect(battle.isBattleEnded()).toBe(false);
    battle.Winner = carapuce;
    expect(battle.isBattleEnded()).toBe(true);
});

test('Test that regular fight end correctly', () =>  {
    const battle = new Battle(carapuce, pikachu);
    while(!battle.isBattleEnded()) {
        const carapuceMove = Math.floor(Math.random() * carapuce.Moves.length);
        const pikachuMove = Math.floor(Math.random() * pikachu.Moves.length);
        var firstRandomAccuracy = Math.floor(Math.random() * 101);
        var secondRandomAccuracy = Math.floor(Math.random() * 101);
        battle.launchTurn(carapuce.Moves[carapuceMove].Name, pikachu.Moves[pikachuMove].Name, firstRandomAccuracy, secondRandomAccuracy);
    }
    expect(battle.isBattleEnded()).toBe(true);
});