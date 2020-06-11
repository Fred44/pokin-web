import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { animate, keyframes, transition, trigger } from '@angular/animations';

import { kf } from '@app/shared';
import { UIVote } from './poll.component';

@Component({
  selector: 'app-team-vote',
  templateUrl: './teammate-vote.component.html',
  styleUrls: ['./teammate-vote.component.scss'],
  animations: [
    trigger('voteAnimator', [
      transition('* => tada', animate(1000, keyframes(kf.tada)))
    ])
  ]
})
export class TeammateVoteComponent implements OnChanges {

  @Input()
  vote: UIVote;

  animationState: '' | 'tada' = '';


  ngOnChanges(changes: SimpleChanges) {
    if (!changes.vote.isFirstChange() && changes.vote.previousValue.at.getTime() !== changes.vote.currentValue.at.getTime()) {
      this.animate();
    }
  }

  animate() {
    if (!this.animationState) {
      this.animationState = 'tada';
    }
  }

  resetAnimation() {
    this.animationState = '';
  }
}
