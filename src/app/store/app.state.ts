import * as fromRouter from '@ngrx/router-store';


export interface AppState {
  router: fromRouter.RouterReducerState<any>;
}
