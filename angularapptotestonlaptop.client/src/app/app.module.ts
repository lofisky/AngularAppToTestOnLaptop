import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './presentation/navbar/navbar.component';
import { LoginComponent } from './presentation/login-register/login/login.component';
import { RegisterComponent } from './presentation/login-register/register/register.component';
import { FormsModule } from '@angular/forms';
import { ProfileViewComponent } from './presentation/profile-view/profile-view.component';
import { HomepageComponent } from './presentation/homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileViewComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
