import { ServerError } from '@app/shared/model';
import * as root from '../app.state';

export interface State {
  pendingOps: string[];
  lastError: {
    action: string;
    serverError: ServerError;
  } | null;
}

export const initialState: State = {
  pendingOps: [],
  lastError: null
};

export interface AppState extends root.AppState {
  operation: State;
}
