import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLE } from '../../constants/role.constante';
import { AccountService } from '../../services/account/account.service';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmationPassword?: string;
}
@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss'
})
export class AuthDialogComponent implements OnInit {

  public authForm!: FormGroup;
  public regForm!: FormGroup;
  private registerData!: IRegister;
  public isLogin = false;
  private checkPassword = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AuthDialogComponent>

  ) { }

  ngOnInit(): void {
    this.initAuthForm();
    this.initRegForm();

  }
  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  initRegForm(): void {
    this.regForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName:  [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      passwordReg:  [null, [Validators.required]],
      confirmedPassword:  [null, [Validators.required]]
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
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) {
        this.router.navigate(['/cabinet']);
        this.accountService.isUserLogin$.next(true);
      }
    }, (e) => {
      console.log('error', e);
    })
  }
  registerUser(): void {
    const { email, passwordReg } = this.regForm.value;
    this.registerData = this.regForm.value;
    this.emailSignUp(email, passwordReg).then(() => {
      this.toastr.success('User successfully created');
      this.isLogin = !this.isLogin;
      this.regForm.reset();
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

  async emailSignUp(email: string, passwordReg: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, passwordReg);
    const user = {
      email: credential.user.email,
      firstName: this.registerData.firstName,
      lastName: this.registerData.lastName,
      phoneNumber: this.registerData.phoneNumber,
      address: '',
      orders: [],
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  changeIsLogin(): void {
    this.isLogin = !this.isLogin;
  }
  checkConfirmedPassword(): void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if(this.password.value !== this.confirmed.value) {
      this.regForm.controls['confirmedPassword'].setErrors({
        matchError: 'Password confirmation doesnt match'
      })
    }
  }

  get password(): AbstractControl {
    return this.regForm.controls['passwordReg'];
  }

  get confirmed(): AbstractControl {
    return this.regForm.controls['confirmedPassword'];
  }

  checkVisibilityError(control: string, name: string): boolean | null {
    return this.regForm.controls[control].errors?.[name]
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
