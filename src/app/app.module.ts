import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormSignUpComponent} from "./pages/sign-up/form-sign-up.component";
import {FormSignInComponent} from "./pages/sign-in/form-sign-in.component";
@NgModule({
  declarations: [
    AppComponent,
    FormSignUpComponent,
    FormSignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
