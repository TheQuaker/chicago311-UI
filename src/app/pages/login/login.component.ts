import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  errorMessage: string;
  loginForm: FormGroup;

  formDefinition = {
    userName: ['', Validators.required],
    password: ['', Validators.required]
  };

  constructor(
    private fb: FormBuilder,
    private loginService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('id_token')) {
      this.router.navigate(['/home/dashboard']);
    }
    this.loginForm = this.fb.group(this.formDefinition);
  }

  login() {
    if (this.loginForm.valid) {
      this.postCredentials();
    } else {
      this.errorMessage = ' Incorrect username or password. ';
      window.scroll(0, 0);
    }
  }

  postCredentials() {
    this.loginService.login(this.loginForm.value).subscribe(
      () => {
        console.log('User is logged in');
        this.router.navigateByUrl('home/dashboard');
      });
  }

  removeAlert() {
    this.errorMessage = '';
  }
}
