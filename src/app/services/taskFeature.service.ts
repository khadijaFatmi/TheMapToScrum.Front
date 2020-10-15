import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskFeature } from '../models/taskfeature.model';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



export class TaskFeatureService {
  private url = environment.apiUrl + '/taask';

  constructor(private http: HttpClient) {}

  liste(): Observable<TaskFeature[]> {
    return this.http.get<TaskFeature[]>(this.url);
  }

  get(): Observable<TaskFeature> {
    return this.http.get<TaskFeature>(this.url);
  }

  getById(id: number): Observable<TaskFeature> {
    return this.http.get<TaskFeature>(this.url + '/' + id.toString());
  }


  listeByUsId(id: number): Observable<TaskFeature[]> {
    return this.http.get<TaskFeature[]>(this.url + '/listeByUsId/' + id);
  }

  listeByProjectId(id: number): Observable<TaskFeature[]> {
    return this.http.get<TaskFeature[]>(this.url + '/listeByProjectId/' + id);
  }

  update(entite: TaskFeature): Observable<TaskFeature> {
    return this.http
    .put<TaskFeature>(this.url, entite)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  create(entite: TaskFeature): Observable<TaskFeature> {
    return this.http
    .post<TaskFeature>(this.url, entite)
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
