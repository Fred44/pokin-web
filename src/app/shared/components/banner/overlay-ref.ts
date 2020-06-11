import { Observable, Subject } from 'rxjs';
import { BannerOptions } from './banner-options';

export class OverlayRef {
  private backdropElement: HTMLElement | null = null;
  private backdropClick$: Subject<MouseEvent> = new Subject();
  private backdropClickHandler = (event: MouseEvent) => this.backdropClick$.next(event);

  constructor(
    private host: HTMLElement,
    private options: BannerOptions,
    private document: Document
  ) {

    if (this.options.hasBackdrop) {
      this.attachBackdrop();
    }
  }

  dispose(): void {
    this.detachBackdrop();
    this.backdropClick$.complete();

    if (this.host && this.host.parentNode) {
      this.host.parentNode.removeChild(this.host);
      this.host = null;
    }
  }

  backdropClick(): Observable<MouseEvent> {
    return this.backdropClick$.asObservable();
  }

  detachBackdrop(): void {
    if (this.backdropElement) {
      this.backdropElement.removeEventListener('click', this.backdropClickHandler);
      if (this.backdropElement.parentNode) {
        this.backdropElement.parentNode.removeChild(this.backdropElement);
      }
      this.backdropElement = null;
    }
  }

  private attachBackdrop() {
    this.backdropElement = this.document.createElement('div');
    this.backdropElement.classList.add('cdk-overlay-backdrop');

    this.host.parentElement.insertBefore(this.backdropElement, this.host);

    this.backdropElement.addEventListener('click', this.backdropClickHandler);
  }
}
