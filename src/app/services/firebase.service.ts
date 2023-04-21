import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, DocumentData, DocumentSnapshot} from "@angular/fire/compat/firestore";
import {User} from "../app.models";
import {from, map, Observable, of, switchMap} from "rxjs";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public isLoggedIn: boolean = false;

  constructor(private databaseClient: AngularFireDatabase,
              private authClient: AngularFireAuth,
              private firestoreClient: AngularFirestore,
              private router: Router) {
    this.isLoggedIn = !!sessionStorage.getItem('user');
  }

  signUp(user: User): Observable<void | null> {
    // from is used to convert a Promise to an Observable
    return from(this.authClient.createUserWithEmailAndPassword(user.email, user.password)).pipe(
      switchMap((result: any) => {
        if (result.user) {
          return from(
            this.firestoreClient
              .collection('users')
              .doc(result.user.uid)
              .set({
                uid: result.user.uid,
                lastname: user.lastname,
                firstname: user.firstname,
              })
          )
        }
        return of(null);
      })
    );
  }

  signIn(user: User): Observable<DocumentSnapshot<DocumentData> | null> {
    return from(this.authClient.signInWithEmailAndPassword(user.email, user.password)).pipe(
      switchMap((result: any) => {
        if (result.user) {
          return from(
            this.firestoreClient
              .collection('users')
              .doc(result.user.uid)
              .get() as Observable<DocumentSnapshot<DocumentData>>
          )
        }
        return of(null);
      })
    );
  }

  signOut(): void {
    this.authClient.signOut().then(() => {
      sessionStorage.removeItem('user');
      this.isLoggedIn = false;
      this.router.navigate(['/sign-in']);
    });
  }

  getUserEmail(): Observable<string | null> {
    return this.authClient.authState.pipe(
      map(user => {
        if (user) {
          return user.email;
        } else {
          return null;
        }
      })
    );
  }

  updateUserInfo(user: User): Observable<void | null> {
    return from(this.authClient.currentUser).pipe(
      switchMap((result: any) => {
        if (result) {
          return from(
            this.firestoreClient
              .collection('users')
              .doc(result.uid)
              .update({
                lastname: user.lastname,
                firstname: user.firstname,
              })
          )
        }
        return of(null);
      })
    );
  }
}
