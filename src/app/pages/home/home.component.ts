import { Component } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {User} from "../../app.models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public userData: User;
  constructor(private firebaseService: FirebaseService){
    this.userData = JSON.parse(sessionStorage.getItem('user') || '{}') as User;
    console.log(this.firebaseService.isLoggedIn);
  }
}
