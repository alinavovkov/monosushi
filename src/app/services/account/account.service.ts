import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ILogin } from '../../interfaces/account/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public isUserLogin$ = new Subject<boolean>();

  private url = `http://localhost:3000`;
  private api = { auth: `${this.url}/auth` };

  constructor(private http: HttpClient) { }

  login(credential: ILogin): Observable<any> {
    return this.http.get(`${this.api.auth}?email=${credential.email}&password=${credential.password}`)
  }
}
