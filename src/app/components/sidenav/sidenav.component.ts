import { Component } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(private firebaseService: FirebaseService) {}

  disconnectUser(): void{
    this.firebaseService.signOut();
  }

}
