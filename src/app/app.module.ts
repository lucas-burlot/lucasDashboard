import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormSignUpComponent} from "./pages/sign-up/form-sign-up.component";
import {FormSignInComponent} from "./pages/sign-in/form-sign-in.component";
import { environment } from '../environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './pages/home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { CreateUpdateApplicationComponent } from './pages/applications/create-application/create-update-application.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DateFrPipe } from 'src/pipes/date-fr.pipe';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

// registerLocalData sert à définir la langue par défaut de l'application
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    FormSignUpComponent,
    FormSignInComponent,
    HomeComponent,
    SidenavComponent,
    ProfileComponent,
    ApplicationsComponent,
    CreateUpdateApplicationComponent,
    DateFrPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    PlotlyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
