import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Type} from '../domain/type';
import {StoredFunction1} from '../domain/stored-function-1';
import {StoredFunction2} from '../domain/stored-function-2';
import {StoredFunction3} from '../domain/stored-function-3';
import {NewIncident} from '../domain/new-incident';
import {AddressZipResponce} from '../domain/address-zip-responce';
import {UserActivity} from '../domain/user-activity';


@Injectable({
  providedIn: 'root'
})

export class RequestsService {
  private url = environment.API_END_POINT + '/search';
  private postUrl = environment.API_END_POINT + '/save/newIncident';
  private userUrl = environment.API_END_POINT + '/users/getUserActivities';

  constructor(
    private http: HttpClient
  ) {}

  getTypeOfRequests() {
    return this.http.get<Type[]>(this.url + '/getTypeOfRequests').pipe(
      catchError(this.handleError)
    );
  }

  getTypeTotalRequests(fromDate: string, toDate: string) {
    let params = new HttpParams();
    params = params.append('fromDate', fromDate);
    params = params.append('toDate', toDate);

    return this.http.get<StoredFunction1[]>(this.url + '/getTypeTotalRequests', {params}).pipe(
      catchError(this.handleError)
    );
  }

  getDayRequests(request: string, startTime: string, endTime: string) {
    let params = new HttpParams();
    params = params.append('request', request);
    params = params.append('startTime', startTime);
    params = params.append('endTime', endTime);

    return this.http.get<StoredFunction2[]>(this.url + '/getDayRequests', {params}).pipe(
      catchError(this.handleError)
    );
  }

  getZipTopRequests(date: string) {
    let params = new HttpParams();
    params = params.append('atDate', date);

    return this.http.get<StoredFunction3[]>(this.url + '/getZipTopRequests', {params}).pipe(
      catchError(this.handleError)
    );
  }

  getRequestsByZipcodeAndStreet(streetaddress: string, zipcode: string) {
    let params = new HttpParams();
    params = params.append('streetaddress', streetaddress);
    params = params.append('zipcode', zipcode);

    return this.http.get<AddressZipResponce[]>(this.url + '/getRequestsByZipcodeAndStreet', {params}).pipe(
      catchError(this.handleError)
    );
  }

  getUserActivities() {
    return this.http.get<UserActivity[]>(this.userUrl).pipe(
      catchError(this.handleError)
    );
  }

  postNewIncident(data: NewIncident) {
    console.log('wtf happens 1 ');
    // console.log(JSON.stringify(data));
    console.log(data);
    return this.http.post(this.postUrl, data).pipe(
      catchError(this.handleError)
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
