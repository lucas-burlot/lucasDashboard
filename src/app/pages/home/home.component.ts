import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../app.models";
import { ApplicationService } from 'src/app/services/application.service';
import { combineLatest, forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public userData: User;
  public nbrValidatedApplications: number = 0;
  public nbrPendingApplications: number = 0;
  public nbrRefusedApplications: number = 0;
  public isLoading: boolean = false;

  constructor(private firebaseService: AuthService, private applicationService: ApplicationService){
    this.userData = JSON.parse(localStorage.getItem('user') || '{}') as User;
    this.loadApplicationsStatus();
  }

  loadApplicationsStatus() {
    this.isLoading = true;
    const validatedApplications$ = this.applicationService.getApplicationsWithStatusAndUser(this.userData?.uid, 'Validated');
    const pendingApplications$ = this.applicationService.getApplicationsWithStatusAndUser(this.userData?.uid, 'Pending');
    const refusedApplications$ = this.applicationService.getApplicationsWithStatusAndUser(this.userData?.uid, 'Refused');

    combineLatest([
      validatedApplications$,
      pendingApplications$,
      refusedApplications$
    ]).subscribe(([validatedApplications, pendingApplications, refusedApplications]) => {
      this.nbrValidatedApplications = validatedApplications.length;
      this.nbrPendingApplications = pendingApplications.length;
      this.nbrRefusedApplications = refusedApplications.length;
      this.isLoading = false;
    });
  }
}
