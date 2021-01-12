import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { Route, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { redirectUnauthorizedToLogin } from '@app/core/auth';

import { PokerNewFormComponent } from './poker-new-form.component';
import { PokerNewPageComponent } from './poker-new-page/poker-new-page.component';
import { CardsPickerComponent } from './cards-picker/cards-picker.component';
import { CreationConfirmComponent } from './creation-confirm/creation-confirm.component';

const routes: Route[] = [
  {
    path: '',
    component: PokerNewPageComponent,
    data: {
      title: 'new',
      authGuardPipe: redirectUnauthorizedToLogin
    },
    canActivate: [ AngularFireAuthGuard ]
  }
];

@NgModule({
  declarations: [
    PokerNewFormComponent,
    PokerNewPageComponent,
    CardsPickerComponent,
    CreationConfirmComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: []
})
export class PokerNewModule { }
