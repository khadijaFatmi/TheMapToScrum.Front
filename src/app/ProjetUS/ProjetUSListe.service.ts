import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjetUserStory } from '../models/projetUserStory.model';
import { Injectable } from '@angular/core';

//@Injectable({
//  providedIn: 'root'
//})

export class ProjetService {
  private url = environment.apiUrl + '/projet';

  constructor(private http: HttpClient) {}

  liste(): Observable<ProjetUserStory[]> {
    return this.http.get<ProjetUserStory[]>(this.url);
  }
}
