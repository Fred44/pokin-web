import * as root from '../app.state';

export interface State {
  theme: string;
}

export const initialState: State = {
  theme: 'DEFAULT-THEME'
};

export interface AppState extends root.AppState {
  settings: State;
}
