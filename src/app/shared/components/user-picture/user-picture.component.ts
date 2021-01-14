import { Component, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '@app/shared/model';

@Component({
  selector: 'app-user-picture',
  templateUrl: './user-picture.component.html',
  styleUrls: ['./user-picture.component.scss']
})
export class UserPictureComponent implements OnInit, OnDestroy, OnChanges {

  @Input() user: User;
  @Input() showStatus = false;
  @Input()
  size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';

  wh = 34;

  displayName: string;
  pictureUrl: string;
  userCode: string;
  status: string;
  lastChanged: Date;

  private sub: Subscription;

  constructor() { }

  ngOnInit() {
    switch (this.size) {
      case 'small':
        this.wh = 24;
        break;
      case 'medium':
        this.wh = 34;
        break;
      case 'large':
        this.wh = 64;
        break;
      case 'xlarge':
        this.wh = 96;
        break;
    }
  }

  ngOnChanges() {
    if (this.user) {
      this.updateData(this.user);
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private updateData(user: User) {
    if (user) {
      this.displayName = user.displayName;
      this.pictureUrl = user.pictureUrl;
      if (this.showStatus) {
        this.status = user.status;
        this.lastChanged = user.lastChanged.toDate();
      }
      this.userCode = this.getUserCode(user.displayName);
    }
  }

  private getUserCode(fullName: string): string {
    if (!fullName) {
      return '';
    }

    const nameTab = fullName.split(/\s+/);
    switch (nameTab.length) {
      case 0:
        return '';
      case 1:
        return (nameTab[0].charAt(0) + nameTab[0].charAt(nameTab[0].length - 1)).toUpperCase();

      default:
        return (nameTab[0].charAt(0) + nameTab[1].charAt(0)).toUpperCase();
    }
  }
}
