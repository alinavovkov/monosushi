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

  async loginUser(): Promise<void> {
    const { email, password } = this.authForm.value;
    try {
      await this.accountService.login({ email, password });
      const user = await this.accountService.getCurrentUser();
      if (user && user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin']);
      }
      this.toastr.success('Admin successfully logged in');
    } catch (error) {
      console.error('Login error:', error);
      this.toastr.error('Failed to login. Please try again.');
    }
  }

}
