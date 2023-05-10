import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../app.models";
import {notSpaceValidator} from "../../validators/noSpace.validator";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  public isLoading: boolean = false;
  public userData: User = {} as User;

  public formProfilInfo : FormGroup = new FormGroup({
    firstname: this.fb.control('', [Validators.required, Validators.maxLength(255), notSpaceValidator]),
    lastname: this.fb.control('', [Validators.required, Validators.maxLength(255), notSpaceValidator])
  })
  constructor(private fb: FormBuilder, private firebaseService: AuthService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.firebaseService.getUserEmail().subscribe({
      next: (result: string | null) => {
        if(result){
          this.userData = JSON.parse(localStorage.getItem('user') || '{}');
          this.userData.email = result;
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error(error.message, 'Internal error');
        this.isLoading = false;
      }
    });
  }
  updateProfile(){
    if(this.formProfilInfo.valid){
      this.isLoading = true;
      this.firebaseService.updateUserInfo(this.formProfilInfo.value).subscribe({
        next: () => {
          this.toastr.success('Profile updated', 'Success');
          localStorage.setItem('user', JSON.stringify(this.formProfilInfo.value));
          this.loadData();
        },
        error: (error) => {
          this.toastr.error(error.message, 'Internal error');
          this.isLoading = false;
        }
      });
    }else{
      this.formProfilInfo.markAllAsTouched();
    }
  }

}

