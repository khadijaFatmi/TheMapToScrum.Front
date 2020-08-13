import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';

import { ScrumMaster } from '../models/scrumMaster.model';

@Injectable({
  providedIn: 'root'
})



export class ScrumMasterService {
  private url = environment.apiUrl + '/scrummaster';

  constructor(private http: HttpClient) {}

  liste(): Observable<ScrumMaster[]> {
    return this.http.get<ScrumMaster[]>(this.url);
  }
  getById(id: number): Observable<ScrumMaster> {
    return this.http.get<ScrumMaster>(this.url + '/' + id.toString());
  }
  // add(objet: UserStory): Observable<UserStory> {
  //   return this.http.post(this.url + '/' + form.toString());
  // }

  update(entite: ScrumMaster): Observable<ScrumMaster> {
    return this.http
    .put<ScrumMaster>(this.url, entite)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  create(entite: ScrumMaster): Observable<ScrumMaster> {
    return this.http
    .post<ScrumMaster>(this.url, entite)
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

