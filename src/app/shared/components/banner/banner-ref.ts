import { Location } from '@angular/common';
import { filter, take, takeUntil } from 'rxjs/operators';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Observable, Subject } from 'rxjs';
import { OverlayRef } from './overlay-ref';
import { BannerContainerComponent } from './banner-container.component';
import { NavigationStart, Router } from '@angular/router';

export class BannerRef<R = any> {

  private disableClose = false;
  private readonly destroyed = new Subject<void>();

  private readonly myAfterClosed = new Subject<R | undefined>();

  private result: R | undefined;

  /** Handle to the timeout that's running as a fallback in case the exit animation doesn't fire. */
  private closeFallbackTimeout: number;


  constructor(
    private overlayRef: OverlayRef,
    private container: BannerContainerComponent,
    private router?: Router) {

    // container.keydownEvents$.pipe(
    //     filter(event => event.code.toUpperCase() === 'ESCAPE' && !this.disableClose && !hasModifierKey(event)),
    //     takeUntil(this.destroyed)
    //   )
    //   .subscribe(event => {
    //     event.preventDefault();
    //     this.close();
    //   });

    // overlayRef.keydownEvents().pipe(
    //   filter(event => event.code.toUpperCase() === 'ESCAPE' && !this.disableClose && !hasModifierKey(event))
    // )
    // .subscribe(event => {
    //   event.preventDefault();
    //   this.close();
    // });

    if (router) {
      router.events.pipe(
        filter(evt => evt instanceof NavigationStart)
      ).subscribe(() => this.close());
    }

    // location.subscribe(() => this.close());

    overlayRef.backdropClick().subscribe(() => {
      if (this.disableClose) {
        // this._containerInstance._recaptureFocus();
      } else {
        this.close();
      }
    });

    container.animationStateChanged.pipe(
      filter(event => event.phaseName === 'done' && event.toState === 'exit'),
      take(1)
    ).subscribe(() => {
      clearTimeout(this.closeFallbackTimeout);
      this.overlayRef.dispose();
      this.container.dispose();
    });
  }

  close(result?: R): void {
    this.result = result;

    this.container.animationStateChanged.pipe(
      filter(event => event.phaseName === 'start'),
      take(1)
    )
    .subscribe(event => {
      this.overlayRef.detachBackdrop();
      this.myAfterClosed.next(result);
      this.myAfterClosed.complete();

      this.closeFallbackTimeout = setTimeout(() => {
        this.overlayRef.dispose();
        this.container.dispose();
      }, event.totalTime + 100);
    });
    this.container.startExitAnimation();

    this.destroyed.next();
    this.destroyed.complete();
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  afterClosed(): Observable<R | undefined> {
    return this.myAfterClosed.asObservable();
  }
}
