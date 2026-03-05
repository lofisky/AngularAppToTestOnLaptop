import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './presentation/login-register/login/login.component';
import { RegisterComponent } from './presentation/login-register/register/register.component';
import { ProfileViewComponent } from './presentation/profile-view/profile-view.component';
import { HomepageComponent } from './presentation/homepage/homepage.component';
import { AiChatComponent } from './presentation/ai-chat/ai-chat.component';
import { FlashcardsComponent } from './presentation/educational-tools/flashcard-set-display/flashcards.component';
import { FlashcardsDisplayComponent } from './presentation/educational-tools/flashcards-display/flashcards-display.component';
import { QuizComponent } from './presentation/educational-tools/quiz/quiz/quiz.component';
import { QuizOptionsComponent } from './presentation/educational-tools/quiz/quiz-options/quiz-options.component';
import { QuizResultsComponent } from './presentation/educational-tools/quiz/quiz-results/quiz-results.component';
import { DiagrammingComponent } from './presentation/educational-tools/diagramming/diagramming.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [GuestGuard] }, //make loginpage first appear upon project loading
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] }, //route for register/sign up page
  { path: 'profile-view', component: ProfileViewComponent, canActivate: [AuthGuard] },
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'ai-chat', component: AiChatComponent, canActivate: [AuthGuard] },
  { path: 'flashcards', component: FlashcardsComponent, canActivate: [AuthGuard] },
  { path: 'flashcards-display/:id', component: FlashcardsDisplayComponent, canActivate: [AuthGuard] }, //dynamic routing for flashcards
  { path: 'quizzes', component: QuizOptionsComponent, canActivate: [AuthGuard] },
  { path: 'quizzes-display/:id', component: QuizComponent, canActivate: [AuthGuard] }, //dynamic routing for quizzes
  { path: 'quiz-results', component: QuizResultsComponent, canActivate: [AuthGuard] },
  { path: 'diagramming', component: DiagrammingComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' } //any other unknown route/path 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //add routes to router module
  exports: [RouterModule] //export router module to be used throughout app
})

export class AppRoutingModule { }
