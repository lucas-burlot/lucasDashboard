import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-sign-up',
  templateUrl: './form-sign-up.component.html',
  styleUrls: ['./form-sign-up.component.scss']
})
export class FormSignUpComponent implements OnInit{

  public formSignUp : FormGroup = new FormGroup({
    firstname: this.fb.control('', [Validators.required, Validators.maxLength(255)]),
    lastname: this.fb.control('', [Validators.required, Validators.maxLength(255)]),
    email: this.fb.control('', [Validators.required, Validators.maxLength(255)]),
    password: this.fb.control('', [Validators.required, Validators.maxLength(255)])
  })
  constructor(private firebaseService: FirebaseService, private fb: FormBuilder) {}

  ngOnInit(): void {

  }

  onSubmit(){
    if(this.formSignUp.valid){
      this.firebaseService.signUp(this.formSignUp.value).subscribe({
        next: () => {
          console.log('User created');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }else{
      this.formSignUp.markAllAsTouched();
    }
  }

}
