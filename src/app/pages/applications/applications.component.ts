import { Component } from '@angular/core';
import { Modal } from 'bootstrap';
import { Application, ApplicationCategory, ApplicationStatus, User } from 'src/app/app.models';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent {
  public applications: Application[] = [];
  public isLoading: boolean = false;
  public selectedApplication?: Application;
  public page = 1;
  public count = 0;
  public pageSize = 4;
  public userData: User = {} as User;


  constructor(private applicationService: ApplicationService, private authService: AuthService) {
    this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.loadApplications();
   }

   loadApplications() {
    this.isLoading = true;
    this.applicationService.getApplicationsForUser(this.userData?.uid).subscribe(applications => {
      this.applications = applications;
      this.isLoading = false;
    });
   }

   openDeleteModal(application: Application) {
    this.selectedApplication = application;
    const deleteModalElement = document.getElementById('deleteModal');
    if (deleteModalElement) {
      const deleteModal = new Modal(deleteModalElement, {
        backdrop: 'static',
      });
      deleteModal.show();
    } else {
      console.error('Delete modal element not found');
    }
  }

  deleteApplication() {
    if (this.selectedApplication) {
      console.log('Deleting application', this.selectedApplication);
      this.isLoading = true;
      this.applicationService.deleteApplication(this.selectedApplication.uid).subscribe({
        next: () => {
          this.isLoading = false;
          //this.applications = this.applications.filter(application => application.uid !== this.selectedApplication?.uid);
          // close the actual modal
          const deleteModalElement = document.getElementById('deleteModal');
          if (deleteModalElement) {
            const deleteModal = Modal.getInstance(deleteModalElement);
            deleteModal?.hide();
          }
          this.selectedApplication = undefined;
        },
        error: () => {
          this.isLoading = false;
          this.selectedApplication = undefined;
        }
      });
    }
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

}
