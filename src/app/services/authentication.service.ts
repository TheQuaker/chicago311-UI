import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {UserCredentials} from '../domain/user-credentials';
import {environment} from '../../environments/environment';
import {throwError} from 'rxjs';

import * as moment from 'moment';
import {catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private url = environment.API_END_POINT + '/user/signin';

  constructor(private http: HttpClient) {
  }

  login(credentials: UserCredentials) {
    return this.http.post<UserCredentials>(this.url, credentials).pipe(
      map(
        res => {
          console.log('response ' + res);
          this.setSession(res);
        },
        catchError(this.handleError)
      ));
  }

  private setSession(authResult) {
    // const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.token);
    console.log('boomshakalaka');
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
