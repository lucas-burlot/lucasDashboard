import { Component } from '@angular/core';
import {Graph, User} from "../../app.models";
import { ApplicationService } from 'src/app/services/application.service';
import { combineLatest } from 'rxjs';

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
  public nbrCDIApplications: number = 0;
  public nbrCDDApplications: number = 0;
  public nbrApprenticeshipContractApplications: number = 0;
  public nbrProfessionalizationContractApplications: number = 0;
  public isLoading: boolean = false;

  public graphByStatus: Graph = {data: [{}], layout: {height: 300, width: 500}};
  public graphByCategory: Graph = {data: [{}], layout: {height: 300, width: 500}};

  constructor(private applicationService: ApplicationService){
    this.userData = JSON.parse(localStorage.getItem('user') || '{}') as User;
    this.loadApplicationsStatus();
    console.log(this.graphByStatus);
  }

  loadApplicationsStatus() {
    this.isLoading = true;
    const validatedApplications$ = this.applicationService.getApplicationsWithStatusAndUser(this.userData?.uid, 'Validated');
    const pendingApplications$ = this.applicationService.getApplicationsWithStatusAndUser(this.userData?.uid, 'Pending');
    const refusedApplications$ = this.applicationService.getApplicationsWithStatusAndUser(this.userData?.uid, 'Refused');
    const CDIApplications$ = this.applicationService.getApplicationsWithCategoryAndUser(this.userData?.uid, 'CDI');
    const CDDApplications$ = this.applicationService.getApplicationsWithCategoryAndUser(this.userData?.uid, 'CDD');
    const apprenticeshipContractApplications$ = this.applicationService.getApplicationsWithCategoryAndUser(this.userData?.uid, 'Apprenticeship contract');
    const professionalizationContractApplications$ = this.applicationService.getApplicationsWithCategoryAndUser(this.userData?.uid, 'professionalization contract');
    combineLatest([
      validatedApplications$,
      pendingApplications$,
      refusedApplications$,
      CDIApplications$,
      CDDApplications$,
      apprenticeshipContractApplications$,
      professionalizationContractApplications$
    ]).subscribe(([validatedApplications, pendingApplications, refusedApplications, CDIApplications,
      CDDApplications, apprenticeshipContractApplications, professionalizationContractApplications]) => {
      this.nbrValidatedApplications = validatedApplications.length;
      this.nbrPendingApplications = pendingApplications.length;
      this.nbrRefusedApplications = refusedApplications.length;
      this.nbrCDIApplications = CDIApplications.length;
      this.nbrCDDApplications = CDDApplications.length;
      this.nbrApprenticeshipContractApplications = apprenticeshipContractApplications.length;
      this.nbrProfessionalizationContractApplications = professionalizationContractApplications.length;
      this.graphByStatus.data = [
        {
          values: [this.nbrValidatedApplications, this.nbrPendingApplications, this.nbrRefusedApplications],
          labels: ['Validated', 'Pending', 'Refused'],
          type: 'pie'
        }
      ];

      this.graphByCategory.data = [
        {
          y: [this.nbrCDIApplications, this.nbrCDDApplications, this.nbrApprenticeshipContractApplications, this.nbrProfessionalizationContractApplications],
          x: ['CDI', 'CDD', 'Apprenticeship', 'Professionalization'],
          type: 'bar'
        }
      ];

      this.isLoading = false;
    });
  }
}
