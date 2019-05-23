import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {UserIOComponent} from './user-i-o.component';
import {LogDisplayerComponent} from '../../components/log-displayer/log-displayer.component';
import {MoveSelectorComponent} from '../../components/move-selector/move-selector.component';
import {PokemonTypePipe} from '../../pipes/pokemon-type.pipe';

@NgModule({
    declarations: [
        UserIOComponent,
        LogDisplayerComponent,
        MoveSelectorComponent,
        PokemonTypePipe
    ],
    imports: [
        BrowserModule,
    ],
    exports: [
        UserIOComponent,
        LogDisplayerComponent,
        MoveSelectorComponent,
    ],
})
export class UserIOModule {
}
