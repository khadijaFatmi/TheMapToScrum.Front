import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStory } from '../models/userstory.model';
import { Injectable } from '@angular/core';

//@Injectable({
//  providedIn: 'root'
//})

export class UserStoryService {
  private url = environment.apiUrl + '/userstory';

  constructor(private http: HttpClient) {}

  liste(): Observable<UserStory[]> {
    return this.http.get<UserStory[]>(this.url);
  }
  getById(id: number): Observable<UserStory> {
    return this.http.get<UserStory>(this.url + '/' + id.toString());
  }
}
