import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-sign-in',
  templateUrl: './form-sign-in.component.html',
  styleUrls: ['./form-sign-in.component.scss']
})
export class FormSignInComponent {
  public formSignIn : FormGroup = new FormGroup({
    email: this.fb.control('', [Validators.required, Validators.maxLength(255)]),
    password: this.fb.control('', [Validators.required, Validators.maxLength(255)])
  })
  constructor(private fb: FormBuilder) {}
}
