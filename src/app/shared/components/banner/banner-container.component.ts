import {
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  HostBinding,
  HostListener,
  ViewChild
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { FocusTrap, ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';
import { fromEvent, Observable } from 'rxjs';
import { BannerOptions } from './banner-options';
import { BannerAnimations } from './banner-animations';

@Component({
  selector: 'app-banner-container',
  template: `
    <div class="banner-content banner-{{options.mode}}"><ng-template cdkPortalOutlet></ng-template></div>
  `,
  styleUrls: ['./banner.scss'],
  animations: [BannerAnimations.bannerContainer],
})
export class BannerContainerComponent extends BasePortalOutlet {

  @HostBinding('class') class = 'banner-container mat-elevation-z4';

  @ViewChild(CdkPortalOutlet, {static: true}) portalOutlet: CdkPortalOutlet;

  @HostBinding('@bannerContainer')
  animState: 'void' | 'enter' | 'exit' = 'enter';

  /** Emits when an animation state changes. */
  animationStateChanged = new EventEmitter<AnimationEvent>();



  readonly keydownEvents$: Observable<KeyboardEvent>;
  private focusTrap: FocusTrap;

  constructor(
    private elementRef: ElementRef,
    private focusTrapFactory: ConfigurableFocusTrapFactory,
    public options?: BannerOptions) {
    super();

    this.keydownEvents$ = fromEvent(this.elementRef.nativeElement, 'keydown') as Observable<KeyboardEvent>;
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal(portal);
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    return this.portalOutlet.attachTemplatePortal(portal);
  }

  @HostListener('@bannerContainer.start', ['$event'])
  onAnimationStart(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  @HostListener('@bannerContainer.done', ['$event'])
  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'enter') {
      this.trapFocus();
    }
    this.animationStateChanged.emit(event);
  }

  startExitAnimation(): void {
    this.animState = 'exit';
  }

  dispose(): void {
    this.portalOutlet.dispose();
  }

  private trapFocus(): void {
    if (!this.focusTrap) {
      this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
    }

    this.focusTrap.focusInitialElementWhenReady().then(hasMovedFocus => {
      // If there were no focusable elements, focus the container itself so the keyboard navigation
      if (!hasMovedFocus && typeof this.elementRef.nativeElement.focus === 'function') {
        this.elementRef.nativeElement.focus();
      }
    });
  }
}
