import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '@app/shared';
import { Layouts } from '@app/shared/model';

import { PokerToolbarComponent } from './toolbar/poker-toolbar.component';
import { PokerInfoComponent } from './info/poker-info.component';
import { PokerResolverService } from './poker-resolver.service';
import { PlayPageComponent } from './page/play-page.component';
import { MyVoteComponent } from './my-vote/my-vote.component';
import { NewPollComponent } from './new-poll/new-poll.component';
import { PollComponent } from './poll/poll.component';
import { TeammateVoteComponent } from './poll/teammate-vote.component';
import { PokerGraphComponent } from './graph/poker-graph.component';

const routes: Route[] = [
  {
    path: ':id',
    component: PlayPageComponent,
    resolve: {
      title: PokerResolverService
    },
    data: {
      title: '',
      layout: Layouts.Main,
      toolbar: PokerToolbarComponent
    }
  },
];

@NgModule({
  declarations: [
    PokerToolbarComponent,
    PokerInfoComponent,
    NewPollComponent,
    MyVoteComponent,
    PollComponent,
    TeammateVoteComponent,
    PokerGraphComponent,
    PlayPageComponent,
  ],
  providers: [PokerResolverService],
  exports: [PokerToolbarComponent],
  imports: [
    SharedModule,
    ChartsModule,
    RouterModule.forChild(routes),
  ]
})
export class PokerPlayModule { }
