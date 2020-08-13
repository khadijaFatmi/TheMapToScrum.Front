import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductOwner } from '../models/productOwner.model';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



export class ProductOwnerService {
  private url = environment.apiUrl + '/productowner';

  constructor(private http: HttpClient) {}

  liste(): Observable<ProductOwner []> {
    return this.http.get<ProductOwner []>(this.url);
  }
  getById(id: number): Observable<ProductOwner > {
    return this.http.get<ProductOwner >(this.url + '/' + id.toString());
  }


  update(entite: ProductOwner ): Observable<ProductOwner > {
    return this.http
    .put<ProductOwner >(this.url, entite)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  create(entite: ProductOwner ): Observable<ProductOwner > {
    return this.http
    .post<ProductOwner >(this.url, entite)
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

