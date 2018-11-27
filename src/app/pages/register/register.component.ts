import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
  public errorMessage: string;
  public registerForm: FormGroup;

  formDefinition = {
    name: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
  };

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(this.formDefinition);
  }

  register() {
    this.removeAlert();
    this.registerForm.controls['password'].updateValueAndValidity();
    this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    if (this.registerForm.valid) {
      if (this.registerForm.get('password').value === this.registerForm.get('confirmPassword').value) {

      } else {
        this.errorMessage = ' Passwords dont match. ';
        this.registerForm.markAsDirty();
        this.registerForm.updateValueAndValidity();
        this.registerForm.controls['password'].markAsDirty();
        this.registerForm.controls['password'].setErrors({'incorrect': true});
        this.registerForm.controls['confirmPassword'].markAsDirty();
        this.registerForm.controls['confirmPassword'].setErrors({'incorrect': true});
        window.scroll(0, 0);
      }
    } else {
      this.errorMessage = ' All fields are required. ';
      this.registerForm.markAsDirty();
      this.registerForm.updateValueAndValidity();
      for (const i in this.registerForm.controls) {
        this.registerForm.controls[i].markAsDirty();
      }
      window.scroll(0, 0);
    }
  }

  removeAlert() {
    this.errorMessage = '';
  }
}
