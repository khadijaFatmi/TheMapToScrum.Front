import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { TechnicalManager } from '../models/technicalManager.model';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



export class TechnicalManagerService {
  private url = environment.apiUrl + '/technicalmanager';

  constructor(private http: HttpClient) {}

  liste(): Observable<TechnicalManager[]> {
    return this.http.get<TechnicalManager[]>(this.url);
  }
  getById(id: number): Observable<TechnicalManager> {
    return this.http.get<TechnicalManager>(this.url + '/' + id.toString());
  }
  // add(objet: UserStory): Observable<UserStory> {
  //   return this.http.post(this.url + '/' + form.toString());
  // }

  update(entite: TechnicalManager): Observable<TechnicalManager> {
    return this.http
    .put<TechnicalManager>(this.url, entite)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  create(entite: TechnicalManager): Observable<TechnicalManager> {
    return this.http
    .post<TechnicalManager>(this.url, entite)
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

