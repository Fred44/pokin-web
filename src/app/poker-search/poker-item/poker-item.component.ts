import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { SearchItem } from '../search.model';

@Component({
  selector: 'app-poker-item',
  templateUrl: './poker-item.component.html',
  styleUrls: ['./poker-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokerItemComponent {

  @Input()
  poker: SearchItem;

}
