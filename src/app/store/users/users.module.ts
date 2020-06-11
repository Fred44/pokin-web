import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';

import { featureKey, reducer } from './users.reducer';
// import { UsersEffects } from './users.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(featureKey, reducer),
    // EffectsModule.forFeature([ UsersEffects ])
  ]
})
export class UsersModule { }
