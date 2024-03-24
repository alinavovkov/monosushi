import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLE } from '../../constants/role.constante';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent {

  public authForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  login(): void {
    console.log(this.authForm.value);
    this.accountService.login(this.authForm.value).subscribe(data => {
      console.log(data);
      
      if(data && data.length > 0) {
        const user = data[0];
        localStorage.setItem('currentUser', JSON.stringify(user))
        this.accountService.isUserLogin$.next(true);
        if(user && user.role === ROLE.USER) {
          this.router.navigate(['/cabinet']);
        } else if(user && user.role === ROLE.ADMIN){
          this.router.navigate(['/admin']);
        }
      }
    }, (e) => {
      console.log(e);
    })
  }

}