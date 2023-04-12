import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormSignInComponent} from "./pages/sign-in/form-sign-in.component";
import {FormSignUpComponent} from "./pages/sign-up/form-sign-up.component";

const routes: Routes = [
  { path: 'sign-up', component: FormSignUpComponent},
  { path: 'sign-in', component: FormSignInComponent},
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
