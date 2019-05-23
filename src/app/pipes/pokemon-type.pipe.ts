import {Pipe, PipeTransform} from '@angular/core';
import {Pokemon} from '../shared/models/pokemon/pokemon';
import {PokemonType} from '../shared/models/pokemon/pokemon-types';
import {PokemonTypeColors} from '../shared/models/pokemon/pokemon-type-colors';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({name: 'pokemontype'})
export class PokemonTypePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }

    transform(pokemon: Pokemon): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(`<b style="color:${this.getColorFromType(pokemon.Types[0])}">${pokemon.Name}</b>`);
    }

    private getColorFromType(pokemonType: PokemonType): string {
        return PokemonTypeColors[pokemonType.toString().toLowerCase()];
    }
}
