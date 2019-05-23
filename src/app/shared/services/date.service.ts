import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable()
export class DateService {

    getDateObservable(): Observable<Date> {
        return new Observable<Date>(observer => {
            setInterval(() => observer.next(new Date()), 1000);
        });
    }
}
