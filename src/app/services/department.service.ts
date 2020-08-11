import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department.model';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



export class DepartmentService {
  private url = environment.apiUrl + '/Department';

  constructor(private http: HttpClient) {}

  liste(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url);
  }
  getById(id: number): Observable<Department> {
    return this.http.get<Department>(this.url + '/' + id.toString());
  }
  // add(objet: UserStory): Observable<UserStory> {
  //   return this.http.post(this.url + '/' + form.toString());
  // }

  update(entite: Department): Observable<Department> {
    return this.http
    .put<Department>(this.url, entite)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  create(entite: Department): Observable<Department> {
    return this.http
    .post<Department>(this.url, entite)
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

