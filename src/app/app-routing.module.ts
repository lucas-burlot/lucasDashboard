import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormSignInComponent} from "./pages/sign-in/form-sign-in.component";
import {FormSignUpComponent} from "./pages/sign-up/form-sign-up.component";
import {HomeComponent} from "./pages/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ApplicationsComponent} from "./pages/applications/applications.component";
import {CreateUpdateApplicationComponent} from "./pages/applications/create-application/create-update-application.component";

const routes: Routes = [
  { path: 'sign-up', component: FormSignUpComponent },
  { path: 'sign-in', component: FormSignInComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuard] },
  { path: 'applications/create', component: CreateUpdateApplicationComponent, canActivate: [AuthGuard]},
  { path: 'applications/update', component: CreateUpdateApplicationComponent
  , canActivate: [AuthGuard]},
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
