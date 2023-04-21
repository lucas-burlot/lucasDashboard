import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router: Router) {
  }
  title = 'MyJob';

  isNotSignInOrSignUp() {
    return this.router.url !== '/sign-in' && this.router.url !== '/sign-up';
  }
}
