import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FirebaseService} from "../../services/firebase.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-form-sign-in',
  templateUrl: './form-sign-in.component.html',
  styleUrls: ['./form-sign-in.component.scss']
})
export class FormSignInComponent {

  public isLoading: boolean = false;
  public formSignIn : FormGroup = new FormGroup({
    email: this.fb.control('', [Validators.required, Validators.maxLength(255)]),
    password: this.fb.control('', [Validators.required, Validators.maxLength(255)])
  })
  constructor(private fb: FormBuilder, private firebaseService: FirebaseService, private toastr: ToastrService) {}

  onSubmit(): void{
    if(this.formSignIn.valid){
      this.isLoading = true;
      this.firebaseService.signIn(this.formSignIn.value).subscribe({
        next: (result) => {
          this.toastr.success('Welcome', 'Success');
          this.isLoading = false;
        },
        error: (error) => {
          this.toastr.error(error.message, 'Internal error');
          this.isLoading = false;
        }
      });
    }else{
      this.formSignIn.markAllAsTouched();
    }
  }
}
