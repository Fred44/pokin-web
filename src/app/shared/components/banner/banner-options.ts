import { InjectionToken } from '@angular/core';

export class BannerOptions {
  mode?: 'push' | 'over';

  data?: any = null;

  hasBackdrop?: boolean;

  disableClose?: boolean;
}

const defaultOptions: BannerOptions = {
  mode: 'push',
  data: {},
  hasBackdrop: true,
  disableClose: false
};

export function applyConfigDefaults(config: BannerOptions = {}): BannerOptions {
  return {...defaultOptions, ...config};
}

export const BANNER_DATA = new InjectionToken<any>('BannerData');
