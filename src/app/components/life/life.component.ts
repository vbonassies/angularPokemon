import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../../shared/models/pokemon/pokemon';

@Component({
  selector: 'app-pokemon-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.css']
})
export class LifeComponent implements OnInit {
  @Input()
  pokemon: Pokemon;
  @Input()
  isFirst: boolean;
  lifeSprite: string;

  ngOnInit(): void {
      this.lifeSprite = `/assets/pictures/life-${this.isFirst ? 'first' : 'second'}.png`;
  }

  getXpPercents() {
    return this.pokemon.Xp * 100 / this.pokemon.XpBeforeNextLevel;
  }

  getHpPercents() {
    return this.pokemon.Hp * 100 / this.pokemon.MaxHp;
  }

  getHpColor() {
    const currentPercent = this.getHpPercents();
    if (currentPercent <= 20) {
      return 'bg-danger';
    } else if (currentPercent <= 50) {
      return 'bg-warning';
    }
    return 'bg-success';
  }
}
