import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';

import { PageLayoutComponent } from './page-layout.component';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    PageLayoutComponent,
    MainLayoutComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    PageLayoutComponent,
    MainLayoutComponent,
  ]
})
export class ShellModule { }
