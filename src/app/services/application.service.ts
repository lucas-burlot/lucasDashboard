import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, DocumentChangeAction, DocumentData, DocumentSnapshot} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {from, map, Observable, of} from "rxjs";
import {Application, ApplicationCategory, ApplicationStatus} from "../app.models";
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  public isLoggedIn: boolean = false;

  constructor(private firestoreClient: AngularFirestore) {
  }

  createApplication(application: Application): Observable<void>{
    const applicationId = this.firestoreClient.createId();
    application.uid = applicationId;
    return from(
      this.firestoreClient
        .collection('applications')
        .doc(applicationId) // Utiliser l'identifiant spécifique pour créer le document
        .set(application) // Utiliser set() pour définir les données du document
    );
  }

  getApplicationsForUser(uid: string): Observable<Application[]> {
    return this.firestoreClient
      .collection('applications', ref => ref.where('user_uid', '==', uid))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            return a.payload.doc.data() as Application;
          })
        )
      );
  }


  getApplicationsWithStatusAndUser(uid: string, status: string): Observable<Application[]> {
    if(status !== 'Validated' && status !== 'Refused' && status !== 'Pending'){
      return of()
    }
    return this.firestoreClient
      .collection('applications', ref => ref.where('user_uid', '==', uid).where('application_status', '==', status))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            return a.payload.doc.data() as Application;
          })
        )
      );
  }

  getApplicationsWithCategoryAndUser(uid: string, category: string): Observable<Application[]> {
    return this.firestoreClient
      .collection('applications', ref => ref.where('user_uid', '==', uid).where('application_category', '==', category))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            return a.payload.doc.data() as Application;
          })
        )
      );
  }

  deleteApplication(applicationId: string): Observable<void> {
    return from(this.firestoreClient.collection('applications').doc(applicationId).delete());
  }

  updateApplication(application: Application): Observable<void>{
    return from(this.firestoreClient.collection('applications').doc(application.uid).update(application));
  }

}
