import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Pokemon } from '../../shared/models/pokemon/pokemon';
import {AttackLog} from '../../shared/models/battle/attack-log';
import {LogDisplayerComponent} from '../log-displayer/log-displayer.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {Move} from '../../shared/models/move/move';

@Component({
  selector: 'app-user-io',
  templateUrl: './user-i-o.component.html',
  styleUrls: ['./user-i-o.component.css']
})
export class UserIOComponent implements OnInit {

  @ViewChild(LogDisplayerComponent) logDisplayer: LogDisplayerComponent;

  @Input()
  pokemon: Pokemon;

  @Input()
  moveSelectRequire: boolean;

  @Input()
  selectedMoveEvent: BehaviorSubject<Move>;

  logs: AttackLog[] = [];

  @Input()
  logEvent: Observable<AttackLog>;

  ngOnInit(): void {
    this.logEvent.subscribe(logCombat => {
      this.logs.push(logCombat);
    });
  }

  onLogged(log: string) {
    this.logs.push(AttackLog.message(log));
  }
}
