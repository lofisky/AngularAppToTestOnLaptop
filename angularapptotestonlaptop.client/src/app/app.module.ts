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
import { AiChatComponent } from './presentation/ai-chat/ai-chat.component';
import { FlashcardsComponent } from './presentation/educational-tools/flashcard-set-display/flashcards.component';
import { ToolOptionsMenuComponent } from './presentation/tool-options-menu/tool-options-menu.component';
import { FlashcardsDisplayComponent } from './presentation/educational-tools/flashcards-display/flashcards-display.component';
import { QuizOptionsComponent } from './presentation/educational-tools/quiz/quiz-options/quiz-options.component';
import { QuizComponent } from './presentation/educational-tools/quiz/quiz/quiz.component';
import { QuizResultsComponent } from './presentation/educational-tools/quiz/quiz-results/quiz-results.component';
import { DiagrammingComponent } from './presentation/educational-tools/diagramming/diagramming.component';
import { CreateFlashcardSetComponent } from './presentation/educational-tool-creation/create-flashcard-set/create-flashcard-set.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileViewComponent,
    HomepageComponent,
    AiChatComponent,
    FlashcardsComponent,
    ToolOptionsMenuComponent,
    FlashcardsDisplayComponent,
    QuizOptionsComponent,
    QuizComponent,
    QuizResultsComponent,
    DiagrammingComponent,
    CreateFlashcardSetComponent
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
