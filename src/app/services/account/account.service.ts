import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../../interfaces/account/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:3000';
  private authUrl = `${this.baseUrl}/auth`;

  public isUserLogin$ = new Subject<boolean>();

  constructor(
    private http: HttpClient
  ) {}

  login(credential: ILogin): Observable<any> {
    return this.http.get(`${this.authUrl}?email=${credential.email}&password=${credential.password}`)
      .pipe(
        catchError((error) => {
          // Handle error gracefully
          console.error('Login error:', error);
          return throwError('Failed to login. Please try again.');
        })
      );
  }
}
