import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-form-sign-up',
  templateUrl: './form-sign-up.component.html',
  styleUrls: ['./form-sign-up.component.scss']
})
export class FormSignUpComponent implements OnInit{

  public isLoading: boolean = false;

  public formSignUp : FormGroup = new FormGroup({
    firstname: this.fb.control('', [Validators.required, Validators.maxLength(255)]),
    lastname: this.fb.control('', [Validators.required, Validators.maxLength(255)]),
    email: this.fb.control('', [Validators.required, Validators.maxLength(255)]),
    password: this.fb.control('', [Validators.required, Validators.maxLength(255), Validators.minLength(6)])
  })
  constructor(private firebaseService: FirebaseService, private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit(): void {}

  onSubmit(){
    if(this.formSignUp.valid){
      this.isLoading = true;
      this.firebaseService.signUp(this.formSignUp.value).subscribe({
        next: () => {
          this.toastr.success('Account created', 'Success');
          this.isLoading = false;
        },
        error: (error) => {
          this.toastr.error(error.message, 'Internal error');
          this.isLoading = false;
        },
      });
    }else{
      this.formSignUp.markAllAsTouched();
    }
  }
}
