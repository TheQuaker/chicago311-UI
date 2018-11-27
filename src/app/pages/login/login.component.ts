import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group(this.formDefinition);
  }

  login() {
    if (this.loginForm.valid) {

    } else {
      this.errorMessage = ' Incorrect username or password. ';
      window.scroll(0, 0);
    }
  }

  removeAlert() {
    this.errorMessage = '';
  }
}
