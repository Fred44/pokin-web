import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { Layouts } from '@app/shared/model';

import { SearchPageComponent } from './search-page/search-page.component';
import { PokerItemComponent } from './poker-item/poker-item.component';

const routes: Route[] = [
  {
    path: 'pokers',
    component: SearchPageComponent,
    data: { layout: Layouts.Main }
  }
];

@NgModule({
  declarations: [SearchPageComponent, PokerItemComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class PokerSearchModule { }
