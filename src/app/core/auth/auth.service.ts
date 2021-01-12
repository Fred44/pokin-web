import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Credential, AuthenticatedUser, UserRegistration } from '@app/shared/model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly user$: Observable<AuthenticatedUser>;

  constructor(private afAuth: AngularFireAuth) {
    console.log('Auth service constructor');

    this.user$ = this.afAuth.authState.pipe(
      switchMap((afUser: firebase.User) => {
        if (afUser) {
          return from(afUser.getIdToken(false).then((token: string) => {
            const user = {
              userId: afUser.uid,
              displayName: afUser.displayName,
              email: afUser.providerData[0].email,
              pictureUrl: afUser.photoURL,
              token
            };

            return user;
          }));
        } else {
          return of(null);
        }
      })
    );
  }

  getUser(): Observable<AuthenticatedUser> {
    return this.user$;
  }

  async signInWithEmailAndPassword(credential: Credential): Promise<firebase.auth.UserCredential> {
    if (credential.rememberMe) {
      await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    } else {
      await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);
    }
    return this.afAuth.signInWithEmailAndPassword(credential.email, credential.password);
  }

  signInWithGoogle(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  async signup(registration: UserRegistration): Promise<void> {
    const data = await this.afAuth.createUserWithEmailAndPassword(
      registration.email,
      registration.password
    );
    return data.user.updateProfile({
      displayName: registration.name
    });
  }

  sendPasswordResetEmail(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  authorizationHeader(user: AuthenticatedUser): string {
    return user ? 'Bearer ' + user.token : null;
  }

  refreshToken(): Promise<string> {
    // TODO: udate current user with that new token
    return this.generateToken(true);
  }

  private generateToken(flag): Promise<string> {
    return firebase.auth().currentUser.getIdToken(flag);
  }

}
