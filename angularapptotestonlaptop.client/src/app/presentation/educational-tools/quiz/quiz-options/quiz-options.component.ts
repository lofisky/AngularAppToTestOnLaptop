import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-quiz-options',
  templateUrl: './quiz-options.component.html',
  styleUrls: ['./quiz-options.component.css']
})
export class QuizOptionsComponent {
  quizzes: any[] = [];
  selectedTopic: string = 'Two pointers'; //default topic
  quizMessage: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchQuizzes(this.selectedTopic);
  }

  redirectToQuizzesDisplayPage(quiz: any) {
    console.log('Navigating to quizzes display with ID:', quiz.quizId);

    if (quiz.quizId && quiz.quizId > 0) {
      this.router.navigate(['/quizzes-display', quiz.quizId]);
    } else {
      console.error('Invalid quizId:', quiz);
    }
  }

  onTopicChange(event: any): void {
    this.selectedTopic = event.target.value;
    this.fetchQuizzes(this.selectedTopic);
  }

  onTopicChangedFromMenu(topic: string): void {
    this.selectedTopic = topic;
    this.fetchQuizzes(topic);
  }

  fetchQuizzes(topic: string): void {
    this.quizMessage = '';

    this.http.get<any[]>(`${environment.apiBaseUrl}/quizzes/getQuizzes?topic=${topic}`)
      .subscribe(quizzes => {
        if (quizzes && quizzes.length > 0) {
          this.quizzes = quizzes;
        }
        else {
          this.quizzes = [];
          this.quizMessage = 'No quiz available for selected topic';
        }
      }, error => {
        this.quizMessage = 'Error fetching quizzes :(';
        console.error('Error fetching quizzes: ', error);
      })
  }
}
