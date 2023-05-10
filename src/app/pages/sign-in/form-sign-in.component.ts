import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {notSpaceValidator} from "../../validators/noSpace.validator";
import {DocumentData, DocumentSnapshot} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-form-sign-in',
  templateUrl: './form-sign-in.component.html',
  styleUrls: ['./form-sign-in.component.scss']
})
export class FormSignInComponent {

  public isLoading: boolean = false;
  public formSignIn : FormGroup = new FormGroup({
    email: this.fb.control('', [Validators.required, Validators.maxLength(255), notSpaceValidator]),
    password: this.fb.control('', [Validators.required, Validators.maxLength(255), notSpaceValidator])
  })
  constructor(private fb: FormBuilder, private firebaseService: AuthService, private toastr: ToastrService, private router: Router) {}

  onSubmit(): void{
    if(this.formSignIn.valid){
      this.isLoading = true;
      this.firebaseService.signIn(this.formSignIn.value).subscribe({
        next: (result: DocumentSnapshot<DocumentData> | null) => {
          if(result){
            this.firebaseService.isLoggedIn = true;
            localStorage.setItem('user', JSON.stringify(result.data()));
            this.toastr.success('Welcome', 'Success');
            this.isLoading = false;
            this.router.navigate(['/']);
          }
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
