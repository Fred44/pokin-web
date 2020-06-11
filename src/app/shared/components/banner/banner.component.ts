import {
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter, AfterViewInit, ViewChild, Injector, TemplateRef, OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BannerService } from '@app/shared/components/banner/banner.service';
import { CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { applyConfigDefaults, BannerOptions } from '@app/shared/components/banner/banner-options';
import { BannerContainerComponent } from '@app/shared/components/banner/banner-container.component';
import { BannerRef } from '@app/shared/components/banner/banner-ref';
import { BannerOverlay } from '@app/shared/components/banner/banner-overlay';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-outlet',
  template: `<ng-template cdkPortalOutlet ></ng-template>`
})
export class BannerOutletComponent implements AfterViewInit {

  @ViewChild(CdkPortalOutlet, {static: true}) portalOutlet: CdkPortalOutlet;

  constructor(private bannerService: BannerService) {}

  ngAfterViewInit(): void {
    this.bannerService.set(this.portalOutlet);
  }
}

@Component({
  selector: 'app-banner',
  template: `
    <ng-container cdkPortalOutlet ></ng-container>
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `,
  styleUrls: ['./banner.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BannerComponent implements OnInit, AfterViewInit {

  @Input()
  private mode: BannerMode = 'push';

  @Input()
  get opened(): boolean { return this.openedVal; }
  set opened(value: boolean) { this.toggle(coerceBooleanProperty(value)); }
  private openedVal = false;

  @Output() readonly openedChange = new EventEmitter<boolean>(true);

  @Output('opened')
  get _openedStream(): Observable<void> {
    return this.openedChange.pipe(filter(o => o), map(() => {}));
  }

  @ViewChild(CdkPortalOutlet, {static: true}) portalOutlet: CdkPortalOutlet;
  @ViewChild('content') content: TemplateRef<any>;

  private viewIsInit = false;
  private options: BannerOptions;
  private bannerRef: BannerRef;

  constructor(private injector: Injector,
              private overlay: BannerOverlay,
              private router: Router) { }

  toggle(open: boolean = !this.opened): void {
    open ? this.open() : this.close();
  }

  open() {
    if (!this.openedVal && this.viewIsInit) {
      const overlayRef = this.overlay.create(this.options);

      const bannerContainer = this.attachContainer(this.options);
      this.bannerRef = new BannerRef(overlayRef, bannerContainer, this.router);

      const tp = new TemplatePortal<any>(this.content, undefined);
      bannerContainer.attachTemplatePortal(tp);

      this.openedVal = true;
      this.openedChange.emit(this.openedVal);

      this.bannerRef.afterClosed().subscribe(() => {
        this.openedVal = false;
        this.openedChange.emit(this.openedVal);
      });
    }
  }

  close() {
    if (this.openedVal && this.bannerRef) {

      this.bannerRef.close();

      this.openedVal = false;
      this.openedChange.emit(this.openedVal);
    }
  }

  ngOnInit(): void {
    this.options = applyConfigDefaults({
      mode: this.mode
    });
  }

  ngAfterViewInit(): void {
    this.viewIsInit = true;
  }

  private attachContainer(options: BannerOptions): BannerContainerComponent {
    const injector = Injector.create({
      parent: this.injector,
      providers: [{provide: BannerOptions, useValue: options}]
    });
    const containerPortal = new ComponentPortal(BannerContainerComponent, undefined, injector);

    if (this.portalOutlet.hasAttached()) {
      this.portalOutlet.detach();
    }

    const containerRef = this.portalOutlet.attach(containerPortal);

    return containerRef.instance;
  }
}

export type BannerMode = 'over' | 'push';
