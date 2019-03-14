import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import * as AuthAction from '../auth/store/auth.action';
@Injectable()
export class AuthService {

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        data => {
         this.store.dispatch(new AuthAction.Signup());
        }
      )
      .catch(
        (error) => {
          console.log(error);
        }
      );
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (response) => {
          this.store.dispatch(new AuthAction.Signin());
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.store.dispatch(new AuthAction.SetToken(token));
              }
            );
        }
      );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.store.dispatch(new AuthAction.SetToken(token))
      );
  }

  logOut() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthAction.Logout());
    this.router.navigate(['signin']);
  }
}
