import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {UserIOComponent} from './user-i-o.component';
import {LogDisplayerComponent} from '../../components/log-displayer/log-displayer.component';
import {MoveSelectorComponent} from "../../components/move-selector/move-selector.component";

@NgModule({
    declarations: [
        UserIOComponent,
        LogDisplayerComponent,
        MoveSelectorComponent,
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
