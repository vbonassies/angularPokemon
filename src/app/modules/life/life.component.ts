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
}
