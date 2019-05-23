import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {AttackLog} from '../../shared/models/battle/attack-log';

@Component({
    selector: 'app-log-displayer',
    templateUrl: './log-displayer.component.html',
    styleUrls: ['./log-displayer.component.scss']
})
export class LogDisplayerComponent {

    @Input() pokemon: Pokemon;

    @Input() attackLogs: AttackLog[];

}
