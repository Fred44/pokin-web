import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PokerOptions } from '@app/shared/model';

@Component({
  selector: 'app-creation-confirm',
  templateUrl: './creation-confirm.component.html',
  styleUrls: ['./creation-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreationConfirmComponent {

  @Input()
  poker: PokerOptions;

}
