import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PwaService } from '@app/core/pwa/pwa.service';

@Component({
  selector: 'app-install-prompt',
  templateUrl: './install-prompt.component.html',
  styleUrls: ['./install-prompt.component.scss']
})
export class InstallPromptComponent {

  constructor(private pwa: PwaService) { }

  install() {
    this.pwa.install();
  }

  close() {
    this.pwa.dismissInstall();
  }
}
