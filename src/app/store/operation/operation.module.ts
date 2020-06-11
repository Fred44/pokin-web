import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { featureKey, reducer } from './operation.reducer';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(featureKey, reducer),
  ]
})
export class OperationModule { }
