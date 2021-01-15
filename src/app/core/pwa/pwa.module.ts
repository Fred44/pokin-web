import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { InstallPromptComponent } from './components/install-prompt/install-prompt.component';
import { PwaService } from './pwa.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    InstallPromptComponent,
  ],
  providers: [
    PwaService,
  ],
  exports: [
    InstallPromptComponent,
  ]
})
export class PwaModule { }
