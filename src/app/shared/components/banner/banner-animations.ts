import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const BannerAnimations: {
  readonly bannerContainer: AnimationTriggerMetadata
} = {

  bannerContainer: trigger('bannerContainer', [
    state('void, exit', style({transform: 'translate3d(0, -100%, 0)'})),
    state('enter', style({transform: 'none'})),
    transition('* => enter',
      animate('300ms')),
    transition('* => void, * => exit',
      animate('200ms'))
  ])
};
