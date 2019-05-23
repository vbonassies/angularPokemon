import {backgroundAvailableFlyingPokemons} from '../pokemon-names-constant';
import {SpriteService} from './sprite.service';

describe('SpriteService', () => {
    let service: SpriteService;
    beforeEach(() => {
        service = new SpriteService();
    });

    it('Should get latest pokemon on random = 1', () => {
        const lastPokemon = backgroundAvailableFlyingPokemons[backgroundAvailableFlyingPokemons.length];
        const randomPokemon = service.getRandomFlyingPokemonName(() => 1);
        expect(randomPokemon).toBe(lastPokemon);
    });

    it('Should get latest pokemon on random = 0', () => {
        const firstPokemon = backgroundAvailableFlyingPokemons[0];
        const randomPokemon = service.getRandomFlyingPokemonName(() => 0);
        expect(randomPokemon).toBe(firstPokemon);
    });

    it('Get background uri ', () => {
        const url = service.getFlyingPokemonSpriteUri('Mantine');
        expect(url).toBe('https://play.pokemonshowdown.com/sprites/xyani/mantine.gif');
    });

});
