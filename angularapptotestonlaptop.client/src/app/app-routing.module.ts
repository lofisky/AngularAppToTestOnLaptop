import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './presentation/login-register/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, //make loginpage first appear upon project loading
  { path: '**', redirectTo: '' } //any other unknown route/path 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //add routes to router module
  exports: [RouterModule] //export router module to be used throughout app
})

export class AppRoutingModule { }
