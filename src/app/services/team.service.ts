import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../models/team.model';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



export class TeamService {
  private url = environment.apiUrl + '/team';

  constructor(private http: HttpClient) {}

  liste(): Observable<Team[]> {
    return this.http.get<Team[]>(this.url);
  }
  getById(id: number): Observable<Team> {
    return this.http.get<Team>(this.url + '/' + id.toString());
  }
  // add(objet: UserStory): Observable<UserStory> {
  //   return this.http.post(this.url + '/' + form.toString());
  // }

  update(entite: Team): Observable<Team> {
    return this.http
    .put<Team>(this.url, entite)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  create(entite: Team): Observable<Team> {
    return this.http
    .post<Team>(this.url, entite)
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

