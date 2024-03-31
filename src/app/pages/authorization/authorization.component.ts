import { Component, OnInit, OnDestroy } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLE } from '../../constants/role.constante';
import { AccountService } from '../../services/account/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent implements OnInit, OnDestroy {

  public authForm!: FormGroup;
  public loginSubscription!: Subscription;
  public isLogin = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
      this.toastr.success('User successfully login');
      console.log(password);

    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) {
        this.router.navigate(['/cabinet']);
      } else if (user && user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin']);
      }
      this.accountService.isUserLogin$.next(true);
    }, (e) => {
      console.log('error', e);
    })
  }

}
