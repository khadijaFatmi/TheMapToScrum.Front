import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';

import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private url = environment.apiUrl + '/project';

  constructor(private http: HttpClient) {}

  liste(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  listAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url + '/All');
  }

  getById(id: number): Observable<Project> {
    return this.http.get<Project>(this.url + '/' + id.toString());
  }

  update(entite: Project): Observable<Project> {
    return this.http
    .put<Project>(this.url, entite)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  create(entite: Project): Observable<Project> {
    return this.http
    .post<Project>(this.url, entite)
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
