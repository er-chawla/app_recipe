import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as AuthAction from './auth.action';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Injectable()
export class AuthEffect {

  @Effect()
  authSignUp = this.action$
    .pipe(
      ofType(AuthAction.TRY_SIGNUP)
    )
    .pipe(
      map((action: AuthAction.TrySignup) => {
        return action.payload;
      })
    )
    .pipe(
      switchMap((authData: { username: string, password: string }) => {
        return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      })
    )
    .pipe(
      switchMap(() => {
        return fromPromise(firebase.auth().currentUser.getIdToken());
      })
    )
    .pipe(
      mergeMap((token: string) => {
        return [
          {
            type: AuthAction.SIGNUP
          },
          {
            type: AuthAction.SET_TOKEN,
            payload: token
          }
        ];
      })
    );

  @Effect()
  authSignIn = this.action$
    .pipe(
      ofType(AuthAction.TRY_SIGNIN),
      map((action: AuthAction.TrySignin) => {
        return action.payload;
      }),
      switchMap((authData: { username: string, password: string }) => {
        return firebase.auth().signInWithEmailAndPassword(authData.username, authData.password);
      }),
      switchMap(() => {
        return firebase.auth().currentUser.getIdToken();
      }),
      mergeMap((token: string) => {
        this.router.navigate(['/']);
        return [
          {
            type: AuthAction.SIGNIN
          },
          {
            type: AuthAction.SET_TOKEN,
            payload: token
          }
        ];
      })
    );

  @Effect({ dispatch: false })
  authLogout = this.action$
    .pipe(
      ofType(AuthAction.LOGOUT),
      tap(() => {
        this.router.navigate(['signin']);
      })
    );
  constructor(private action$: Actions, private router: Router) { }
}
