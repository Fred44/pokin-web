import {
  Injectable,
  Injector,
  OnDestroy, StaticProvider,
} from '@angular/core';
import { Location } from '@angular/common';
import { ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal, PortalOutlet } from '@angular/cdk/portal';

import { BannerContainerComponent } from './banner-container.component';
import { applyConfigDefaults, BANNER_DATA, BannerOptions } from './banner-options';
import { BannerRef } from './banner-ref';
import { AlertWrapperComponent } from './alert-wrapper';
import { BannerOverlay } from './banner-overlay';
import { Router } from '@angular/router';

@Injectable()
export class BannerService implements OnDestroy {

  private outlet: PortalOutlet;
  private openBannerRef: BannerRef;

  open<T>(component: ComponentType<T>, options?: BannerOptions): BannerRef {
    if (!this.outlet) {
      throw new Error('No banner-outlet is initialized.');
    }

    this.close();

    const fullOptions = applyConfigDefaults(options);

    const overlayRef = this.overlay.create(fullOptions);

    const bannerContainer = this.attachContainer(fullOptions);
    this.openBannerRef = new BannerRef(overlayRef, bannerContainer, this.router);

    const cp = new ComponentPortal(component, undefined, this.createInjector(fullOptions, this.openBannerRef));
    bannerContainer.attachComponentPortal(cp);

    return this.openBannerRef;
  }

  alert(options: {
    level: 'error' | 'warn' | 'info',
    title?: string,
    text?: string
  }): BannerRef {

    const bannerOptions: BannerOptions = {
      mode: 'push',
      data: {
        level: options.level,
        icon: options.level,
        title: options.title || 'Oups! Something went wrong',
        text: options.text,
        hasClose: true
      }
    };
    return this.open(AlertWrapperComponent, bannerOptions);
  }

  confirm(options: {
    title: string,
    text?: string,
    icon?: string
  }): BannerRef {
    const bannerOptions: BannerOptions = {
      mode: 'push',
      data: {
        icon: options.icon || 'help',
        level: 'confirm',
        title: options.title,
        text: options.text,
        hasClose: false
      }
    };
    return this.open(AlertWrapperComponent, bannerOptions);
  }

  close() {
    if (this.openBannerRef) {
      this.openBannerRef.close();
    }
  }

  set(outlet: PortalOutlet) {
    this.outlet = outlet;
  }

  ngOnDestroy(): void {
    this.close();
  }

  private attachContainer(options: BannerOptions): BannerContainerComponent {
    const injector = Injector.create({
      parent: this.injector,
      providers: [{provide: BannerOptions, useValue: options}]
    });
    const containerPortal = new ComponentPortal(BannerContainerComponent, undefined, injector);

    if (this.outlet.hasAttached()) {
      this.outlet.detach();
    }

    const containerRef = this.outlet.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector(options: BannerOptions, bannerRef: BannerRef): Injector {
    const providers: StaticProvider[] = [
      { provide: BANNER_DATA, useValue: options.data },
      { provide: BannerRef, useValue: bannerRef }
    ];
    return Injector.create({ parent: this.injector, providers});
  }

  constructor(
    private injector: Injector,
    private overlay: BannerOverlay,
    private router: Router
  ) { }
}
