import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AppState } from '@app/store';
import * as authSelect from '@app/store/auth/auth.selectors';

import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  private authHeader: string;

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) {
    this.store.pipe(
      select(authSelect.user),
      map(user => this.authService.authorizationHeader(user))
    ).subscribe((header: string) => this.authHeader = header);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authHeader) {
      // Clone the request to add the new header.
      const authReq = req.clone({ headers: req.headers.set('Authorization', this.authHeader) });
      // Pass on the cloned request instead of the original request.
      return next.handle(authReq).pipe(catchError((error, caught) => {

        if (error.status === 401) {
          // logout users, redirect to login page
          this.authService.signOut();
          this.router.navigate(['signin']);
        }

        if (error.status === 419) {
          // We should refresh the token
          return next.handle(authReq);
        }

        // return all others errors
        return throwError(error);

      })) as any;
    } else {
      return next.handle(req);
    }
  }

}
