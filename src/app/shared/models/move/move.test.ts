import {Move} from './move';

test('Move is correctly constructed', () => {
    const moveName = 'mega-punch';
    const moveAccuracy = 85;
    const moveDamage = 10;
    const move = new Move(moveName, moveAccuracy, moveDamage);
    expect(move.Name).toBe(moveName);
    expect(move.Accuracy).toBe(moveAccuracy);
    expect(move.Power).toBe(moveDamage);
});
