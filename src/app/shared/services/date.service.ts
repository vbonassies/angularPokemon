import {Injectable} from '@angular/core';
import {interval, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class DateService {

    getDateObservable(): Observable<Date> {
        return interval(1000).pipe(map(e => new Date()));
    }
}
