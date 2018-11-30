import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {UserInfo} from '../domain/user-info';

import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {CurrentUser} from '../domain/current-user';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  private url = environment.API_END_POINT + '/users/signup';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
    ) {}

  // private httpOption = {
  //   headers: new HttpHeaders({
  //     'responseType': 'text'
  //   })
  // };

  /** POST **/
  registerUser(user: UserInfo): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(this.url, user).pipe(
        map(
          res => {
            // localStorage.setItem('id_token', res.jwt);
            // localStorage.setItem('user_name', res.username);
            this.authService.setSession(res)
            console.log('responce = ' + res);
            return res;
            },
          catchError(this.handleError))
      );
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
