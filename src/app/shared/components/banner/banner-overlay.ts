import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';

import { OverlayRef } from './overlay-ref';
import { BannerOptions } from './banner-options';

@Injectable()
export class BannerOverlay {

  constructor(
    private overlayContainer: OverlayContainer,
    @Inject(DOCUMENT) private document: any
  ) { }

  create(options?: BannerOptions): OverlayRef {
    const host = this.createHostElement();

    return new OverlayRef(host, options, this.document);
  }

  private createHostElement(): HTMLElement {
    const host = this.document.createElement('div');
    this.overlayContainer.getContainerElement().appendChild(host);
    return host;
  }
}
