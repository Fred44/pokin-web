import { style } from '@angular/animations';

export const tada = [
  // style({backgroundColor: '#EEE', borderRadius: '5px', offset: 0}),
  style({transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)', offset: .1}),
  style({transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)', offset: .2}),
  style({transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: .3}),
  style({transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: .4}),
  style({transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: .5}),
  style({transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: .6}),
  style({transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: .7}),
  style({transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: .8}),
  style({transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: .9}),
  style({transform: 'none', offset: 1})
];
