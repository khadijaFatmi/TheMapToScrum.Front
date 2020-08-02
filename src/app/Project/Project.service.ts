import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Projet } from '../models/projets.model';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProjetService {
  private url = environment.apiUrl + '/projet';

  constructor(private http: HttpClient) {}

  liste(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.url);
  }

  getById(id: number): Observable<Projet> {
    return this.http.get<Projet>(this.url + '/' + id.toString());
  }

  update(entite: Projet): Observable<Projet> {
    return this.http
    .put<Projet>(this.url, entite)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  create(entite: Projet): Observable<Projet> {
    return this.http
    .post<Projet>(this.url, entite)
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
