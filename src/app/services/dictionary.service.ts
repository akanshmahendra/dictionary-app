import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  getMeaning(word: string) {
    return this.http.get(this.url + word).pipe(catchError(this.handleError));
  }
}
