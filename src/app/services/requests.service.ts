import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {StoredFunction3} from '../domain/stored-function-3';


@Injectable({
  providedIn: 'root'
})

export class RequestsService {
  private url = environment.API_END_POINT + '/search/getZipTopRequests';

  constructor(
    private http: HttpClient
  ) {}

  getZipTopRequests(date: string) {
    let params = new HttpParams();
    params = params.append('atDate', date);

    return this.http.get<StoredFunction3[]>(this.url, {params}).pipe(
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
