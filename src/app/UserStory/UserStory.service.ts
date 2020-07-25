import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStory } from '../models/userstory.model';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



export class UserStoryService {
  private url = environment.apiUrl + '/userstory';

  constructor(private http: HttpClient) {}

  liste(): Observable<UserStory[]> {
    return this.http.get<UserStory[]>(this.url);
  }
  getById(id: number): Observable<UserStory> {
    return this.http.get<UserStory>(this.url + '/' + id.toString());
  }
  // add(objet: UserStory): Observable<UserStory> {
  //   return this.http.post(this.url + '/' + form.toString());
  // }

  update(entite: UserStory): Observable<UserStory> {
    return this.http
    .put<UserStory>(this.url, entite)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log('error http', error);
    return throwError(error);
  }
}
