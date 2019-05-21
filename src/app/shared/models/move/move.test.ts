import {Move} from "./move";

test('Move is correctly constructed', () => {
    const moveName = 'mega-punch';
    const moveDescription = 'Pickachu mega-punch applyMove!';
    const moveAccuracy = 85;
    const moveDamage = 10;
    const move = new Move(moveName, moveDescription, moveAccuracy, moveDamage);
    expect(move.Name).toBe(moveName);
    expect(move.Description).toBe(moveDescription);
    expect(move.Accuracy).toBe(moveAccuracy);
    expect(move.Damage).toBe(moveDamage);
});