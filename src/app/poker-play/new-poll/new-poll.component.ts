import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState, playAction } from '@app/store';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPollComponent {

  pollForm: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.pollForm = fb.group({
      question: ''
    });
  }

  submit() {
    if (this.pollForm.valid) {
      this.store.dispatch(playAction.newPoll({ options: this.pollForm.value }));
    }
  }
}
