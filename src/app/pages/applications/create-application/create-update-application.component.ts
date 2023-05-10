import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ApplicationService} from "../../../services/application.service";
import {Application, ApplicationCategory, ApplicationStatus} from "../../../app.models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {notSpaceValidator} from "../../../validators/noSpace.validator";
import { Observable, combineLatest, forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-update-application.component.html',
  styleUrls: ['./create-update-application.component.scss']
})
export class CreateUpdateApplicationComponent{
  public applicationCategories: ApplicationCategory[] = [];
  public applicationStatus: ApplicationStatus[] = [];
  public isLoading: boolean = false;
  public application?: Application;

  public formCreateApplication : FormGroup = new FormGroup({
    application_title: this.fb.control('', [Validators.required, Validators.maxLength(255), notSpaceValidator]),
    company_name: this.fb.control('', [Validators.required, Validators.maxLength(255), notSpaceValidator]),
    application_category: this.fb.control('', [Validators.required, Validators.maxLength(255), notSpaceValidator]),
    application_date: this.fb.control('', [Validators.required, Validators.maxLength(255), notSpaceValidator]),
    application_contact_name: this.fb.control('', [Validators.required, Validators.maxLength(255), notSpaceValidator]),
    application_contact_phone: this.fb.control('', [Validators.required, Validators.maxLength(255), notSpaceValidator]),
    application_contact_email: this.fb.control('', [Validators.required, Validators.maxLength(255), notSpaceValidator]),
    application_status: this.fb.control('', [Validators.required, Validators.maxLength(255), notSpaceValidator]),
  })

  constructor(private applicationService: ApplicationService, private fb: FormBuilder,
    private toastr: ToastrService, private authService: AuthService, private router: Router) {
    this.application = history.state?.application;
    this.applicationCategories = environment.application_category;
    this.applicationStatus = environment.application_status;

    // if we have an application, we fill the form with the data (It's an update)
    if(this.application){
      this.formCreateApplication.patchValue(this.application);
    }
  }

  onSubmit() {
    if(this.formCreateApplication.valid){
      if(this.authService.isLoggedIn){
        this.formCreateApplication.value.user_uid = JSON.parse(localStorage.getItem('user') || '{}').uid
      }
      this.isLoading = true;
      if(this.application){
        this.formCreateApplication.value.uid = this.application.uid;
        this.applicationService.updateApplication(this.formCreateApplication.value).subscribe({
          next: () => {
            this.isLoading = false;
            this.toastr.success('Application updated successfully', 'Success');
            this.router.navigate(['/applications']);
        }, error: (error) => {
            console.log(error);
            this.isLoading = false;
            this.toastr.error('Application could not be updated', 'Error');
        }});
      }else{
      this.applicationService.createApplication(this.formCreateApplication.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.toastr.success('Application created successfully', 'Success');
          this.router.navigate(['/applications']);
      }, error: () => {
          this.isLoading = false;
          this.toastr.error('Application could not be created', 'Error');
      }});
    }
    }else{
      this.formCreateApplication.markAllAsTouched();
    }
  }

}
