import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(private firebaseService: AuthService) {}

  disconnectUser(): void{
    this.firebaseService.signOut();
  }

}
