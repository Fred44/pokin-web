import { AuthenticatedUser } from '@app/shared/model';
import * as root from '../app.state';

export interface AppState extends root.AppState {
  auth: State;
}

export interface State {
  initialized: boolean;
  user?: AuthenticatedUser;
}

export const initialState: State = {
  initialized: false,
};
