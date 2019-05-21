import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BattleComponent} from './battle.component';

const battleRoutes: Routes = [{
    path: 'battle',
    component: BattleComponent
}];

@NgModule({
  imports: [RouterModule.forChild(battleRoutes)],
  exports: [RouterModule]
})
export class BattleRoutingModule { }
