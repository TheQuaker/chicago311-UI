import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';

import * as moment from 'moment';
import {catchError, map} from 'rxjs/operators';
import {CurrentUser} from '../domain/current-user';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private url = environment.API_END_POINT + '/users/signin';
  public userName = null;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(this.url, {username, password}).pipe(
      map(
        res => {
          console.log('response ' + res);
          this.setSession(res);
          return res;
        },
        catchError(this.handleError)
      ));
  }

  public setSession(authResult) {
    const expiresAt = moment().add(authResult.mseconds / 1000, 'second');

    localStorage.setItem('id_token', authResult.jwt);
    localStorage.setItem('user_name', authResult.username);
    this.userName = localStorage.getItem('user_name');
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    console.log(localStorage.getItem('expires_at'));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
    if (localStorage.getItem('id_token')) { //
      // logged in so return true
      return true;
    } else { return false; }
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
