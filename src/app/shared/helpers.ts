import { Subscription } from 'rxjs';

export function unsubscribe(subscriptions: Subscription[]) {
  if (subscriptions) {
    subscriptions.forEach(sub => {
      if (sub && sub instanceof Subscription) {
        sub.unsubscribe();
      }
    });

  }
}
