import {animate, keyframes, style, transition, trigger} from '@angular/animations';

export const attackAnimation = trigger('attackAnimation', [
    transition('* => attacking', [
        animate('250ms ease', style({
            transform: 'translate(100%, -105%)'
        })),
        animate('500ms ease', style({
            transform: 'translate(0%, 0%)'
        }))
    ]),
    transition('* => attacked', [
        animate('250ms', style({})),
        animate('1000ms', keyframes([
            style({ opacity: 0.3 }),
            style({ opacity: 1 }),
            style({ opacity: 0.3 }),
            style({ opacity: 1 }),
            style({ opacity: 0.3 }),
            style({ opacity: 1 }),
            style({ opacity: 0.3 }),
            style({ opacity: 1 }),
            style({ opacity: 0.3 })
        ]))
    ])
]);
