import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const pokemonAnimation = trigger('pokemonAnimation', [
    state('isDead', style({
        opacity: 0
    })),
    state('initial', style({
        opacity: 0
    })),
    transition('* => attackingFirst', [
        animate('250ms ease', style({
            transform: 'scale(2) translate(40px, -60px)'
        })),
        animate('500ms ease', style({
            transform: 'scale(2) translate(-50%, 0%)'
        }))
    ]),
    transition('* => attackingSecond', [
        animate('250ms ease', style({
            transform: 'scale(2) translate(-40px, 60px)'
        })),
        animate('500ms ease', style({
            transform: 'scale(2) translate(50%, 0%)'
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
    ]),
    transition('* => isDead', [
        animate('600ms', style({opacity: 0}))
    ]),
    transition('initial => sleep', [
        animate('250ms', keyframes([
            style({opacity: 0}),
            style({opacity: 1})
        ]))
    ])
]);

export const pokeballAnimation = trigger('pokeballAnimation', [
    transition('* => pokePopFirst', [
        animate('1000ms ease', keyframes([
            style({
                transform: 'translate(0,0)'
            }),
            style({
                transform: 'translate(85px, -150px)'
            }),
            style({
                transform: 'translate(95px, -160px)'
            }),
            style({
                transform: 'translate(100px, -170px)'
            }),
            style({
                transform: 'translate(105px, -160px)'
            }),
            style({
                transform: 'translate(115px, -150px)'
            }),
            style({
                transform: 'translate(180px, -10px)'
            })
        ])),
        animate('250ms linear',
            style({
                opacity: 0
        }))
    ]),
    transition('* => pokePopSecond', [
        animate('1000ms ease', keyframes([
            style({
                transform: 'translate(0, 40px)'
            }),
            style({
                transform: 'translate(-10px, 40px)'
            }),
            style({
                transform: 'translate(-85px, 30px)'
            }),
            style({
                transform: 'translate(-100px, 20px)'
            }),
            style({
                transform: 'translate(-115px, 10px)'
            }),
            style({
                transform: 'translate(-115px, 20px)'
            }),
            style({
                transform: 'translate(-125px, 200px)'
            })
        ])),
        animate('250ms linear',
            style({
                opacity: 0
            }))
    ])
]);
