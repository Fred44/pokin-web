import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PwaService {

  private showSub = new BehaviorSubject(false);

  private promptEvt: any;

  constructor() {

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.promptEvt = e;
      // Update UI notify the user they can install the PWA
      console.log('Show PWA banner');

      this.showSub.next(true);
    });

    window.addEventListener('appinstalled', (evt) => {
      // Log install to analytics
      console.log('INSTALL: Success');
    });
  }

  get showPrompt(): Observable<boolean> { return this.showSub; }

  install() {
    console.log('Install the App !');
    this.showSub.next(false);

    // Show the install prompt
    this.promptEvt.prompt();
    // Wait for the user to respond to the prompt
    this.promptEvt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  }

  dismissInstall() {
    console.log('User dismissed the install prompt');
    this.showSub.next(false);
  }
}
