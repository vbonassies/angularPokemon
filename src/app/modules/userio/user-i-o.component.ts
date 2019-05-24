import {Component, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Pokemon} from '../../shared/models/pokemon/pokemon';
import {AttackLog} from '../../shared/models/battle/attack-log';
import {LogDisplayerComponent} from '../../components/log-displayer/log-displayer.component';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Move} from '../../shared/models/move/move';

@Component({
    selector: 'app-user-io',
    templateUrl: './user-i-o.component.html',
    styleUrls: ['./user-i-o.component.css']
})
export class UserIOComponent implements OnInit, OnDestroy {

    @ViewChild(LogDisplayerComponent) logDisplayer: LogDisplayerComponent;

    @Input()
    pokemon: Pokemon;

    @Input()
    moveSelectRequire: boolean;

    @Input()
    exitSelectRequire: boolean;

    @Input()
    selectedMoveEvent: BehaviorSubject<Move>;

    logs: AttackLog[] = [];

    @Input()
    logEvent: Observable<AttackLog>;

    private subscription: Subscription = null;

    ngOnInit(): void {
        this.subscription = this.logEvent.subscribe(logCombat => {
            if (logCombat) {
                this.logs.push(logCombat);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onLogged(log: string): void {
        this.logs.push(AttackLog.message(log));
    }
}
