import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {FirebaseService} from "../services/firebase.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private firebaseServie: FirebaseService, private router: Router, private toastr: ToastrService){
  }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.firebaseServie.isLoggedIn) {
      this.router.navigate(['/sign-in']);
      this.toastr.error('You must be logged in to access this page', 'Access denied');
      return false;
    }
    return true;
  }

}
