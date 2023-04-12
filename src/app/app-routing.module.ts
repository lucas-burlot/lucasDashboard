import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserSignUpComponent} from "./user/user-sign-up/user-sign-up.component";

const routes: Routes = [
  { path: 'sign-up', component: UserSignUpComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
