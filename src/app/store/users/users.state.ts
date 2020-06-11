import { User } from '@app/shared/model/user';
import * as root from '../app.state';

export interface State {
  [uid: string]: User;
}

export const initialState: State = {
  // wDTCZn7vPqVUtc7nKyZUFraYXcf1: {
  //   userId: 'wDTCZn7vPqVUtc7nKyZUFraYXcf1',
  //   displayName: 'Fred',
  //   pictureUrl: 'https://lh3.googleusercontent.com/a-/AAuE7mA8wTpX_uf6ixfOvg5Hmy292N_LZDVeBoH7WqEXDA'
  // },
  // SzGFN8SjWGh4G39fX5bd8FD40KI3: {
  //   userId: 'SzGFN8SjWGh4G39fX5bd8FD40KI3',
  //   displayName: 'MArc',
  //   pictureUrl: 'https://gravatar.com/avatar/dab7abacbb6e64ab459845d5b0206dda?s=400&d=robohash&r=x'
  // }
};

export interface AppState extends root.AppState {
  users: State;
}
