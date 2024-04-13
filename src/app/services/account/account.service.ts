import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import {Auth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {doc, docData, Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isUserLogin$ = new Subject<boolean>();

  constructor(
    private auth: Auth,
    private afs: Firestore
  ) {}


  login(credentials: { email: string, password: string }): Promise<void> {
    return signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)
      .then((credential) => {
        this.isUserLogin$.next(true);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
  async getCurrentUser(): Promise<any> {
    const user = await this.auth.currentUser;
    if (user) {
      return docData(doc(this.afs, 'users', user.uid)).toPromise();
    }
    return null;
  }

}
