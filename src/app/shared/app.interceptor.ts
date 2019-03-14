import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducers';
@Injectable()
export class AppIntercepor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string = null;
    this.store.select('auth').subscribe((authData: fromAuth.AuthState)  => {
      token = authData.token;
    });
    const cloneRequest = req.clone({ params: new HttpParams().set('auth', token) });
    return next.handle(cloneRequest);
  }
}
