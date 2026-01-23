import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './presentation/login-register/login/login.component';
import { RegisterComponent } from './presentation/login-register/register/register.component';
import { ProfileViewComponent } from './presentation/profile-view/profile-view.component';
import { HomepageComponent } from './presentation/homepage/homepage.component';
import { AiChatComponent } from './presentation/ai-chat/ai-chat.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, //make loginpage first appear upon project loading
  { path: 'register', component: RegisterComponent }, //route for register/sign up page
  { path: 'profile-view', component: ProfileViewComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'ai-chat', component: AiChatComponent },
  { path: '**', redirectTo: '' } //any other unknown route/path 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //add routes to router module
  exports: [RouterModule] //export router module to be used throughout app
})

export class AppRoutingModule { }
