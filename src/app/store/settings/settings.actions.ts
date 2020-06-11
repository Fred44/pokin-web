import { createAction, props } from '@ngrx/store';

export const themeChanged = createAction(
  '[Settings] Theme changed',
  props<{ theme: string }>()
);

export type SettingsAction = ReturnType<typeof themeChanged>;
