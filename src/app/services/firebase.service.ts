import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../app.models";
import {catchError, from, Observable, of, switchMap} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private databaseClient: AngularFireDatabase, private authClient: AngularFireAuth, private firestoreClient: AngularFirestore) { }

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
                password: user.password,
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
