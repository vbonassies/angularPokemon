import {StorageService} from './storage.service';
import {Pokemon} from '../models/pokemon/pokemon';

describe('StorageService', () => {
    let service: StorageService;
    beforeEach(() => {
        service = new StorageService();
    });

    it('Should correctly save pokemon', () => {
        const pokemon = new Pokemon('testPokemon', 12, 12, 12, undefined);
        pokemon.Xp = 12;
        service.saveUserPokemon(pokemon);
        expect(localStorage.getItem(pokemon.Name + '_HP')).toBe(pokemon.Hp.toString());
        expect(localStorage.getItem(pokemon.Name + '_XP')).toBe(pokemon.Xp.toString());
        expect(localStorage.getItem(pokemon.Name + '_LEVEL')).toBe(pokemon.Level.toString());
    });

    it('Should correctly load pokemon', () => {
        const pokemon = new Pokemon('testPokemon', 12, 12, 12, undefined);
        pokemon.Xp = 12;
        localStorage.setItem(pokemon.Name + '_HP', pokemon.Hp.toString())
        localStorage.setItem(pokemon.Name + '_XP', pokemon.Xp.toString())
        localStorage.setItem(pokemon.Name + '_LEVEL', pokemon.Level.toString())
        expect(service.getUserPokemonHp(pokemon.Name)).toBe(pokemon.Hp);
        expect(service.getUserPokemonXp(pokemon.Name)).toBe(pokemon.Xp);
        expect(service.getUserPokemonLevel(pokemon.Name)).toBe(pokemon.Level);
    });
});
