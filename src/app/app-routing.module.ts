import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Layouts } from '@app/shared/model';

import { WelcomeComponent } from './welcome.component';


const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: { layout: Layouts.Page }
  },
  {
    path: '**',
    redirectTo: 'welcome'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
