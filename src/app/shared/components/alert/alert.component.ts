import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  @Input() type = 'error';
  @Input() icon = 'error';
  @Input() title = 'Oups! Something went wrong';
  @Input() text: string;
  @Input() hasClose = false;

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

}
