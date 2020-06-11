import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import {
  BannerModule,
} from './components/banner';
import { UserPictureComponent, LinkShareComponent, TimerComponent, FooterComponent } from './components';
import { MomentModule } from 'ngx-moment';
import { AlertModule } from './components/alert';

@NgModule({
  declarations: [
    TimerComponent,
    UserPictureComponent,
    LinkShareComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    MomentModule,
    AlertModule,
    BannerModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    MomentModule,
    AlertModule,
    BannerModule,
    TimerComponent,
    UserPictureComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
