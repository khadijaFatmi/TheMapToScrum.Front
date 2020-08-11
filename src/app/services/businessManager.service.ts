import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { BusinessManager } from '../models/businessManager.model';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



export class BusinessManagerService {
  private url = environment.apiUrl + '/businessmanager';

  constructor(private http: HttpClient) {}

  liste(): Observable<BusinessManager[]> {
    return this.http.get<BusinessManager[]>(this.url);
  }
  getById(id: number): Observable<BusinessManager> {
    return this.http.get<BusinessManager>(this.url + '/' + id.toString());
  }
  // add(objet: UserStory): Observable<UserStory> {
  //   return this.http.post(this.url + '/' + form.toString());
  // }

  update(entite: BusinessManager): Observable<BusinessManager> {
    return this.http
    .put<BusinessManager>(this.url, entite)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  create(entite: BusinessManager): Observable<BusinessManager> {
    return this.http
    .post<BusinessManager>(this.url, entite)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  delete(id: number): Observable<{}> {
    const url2 = `${this.url}/${id}`;
    return this.http
    .delete<boolean>(url2)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log('error http', error);
    return throwError(error);
  }
}

