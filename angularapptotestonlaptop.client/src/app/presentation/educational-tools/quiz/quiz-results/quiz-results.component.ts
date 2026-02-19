import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent {
  quizTitle: string = '';
  quizQuestions: any[] = [];
  score: number = 0;
  totalQuestions: number = 0;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) { }


  redirectToQuizOptionsPage() {
    this.router.navigate(['/quizzes']);
  }

  ngOnInit(): void {
    this.quizTitle = this.activatedRoute.snapshot.queryParamMap.get('title') || 'Issue loading quiz title';

    const scoreParam = this.activatedRoute.snapshot.queryParamMap.get('score');
    this.score = scoreParam ? +scoreParam : 0;

    const totalQuestionsParam = this.activatedRoute.snapshot.queryParamMap.get('totalQuestions');
    this.totalQuestions = totalQuestionsParam ? +totalQuestionsParam : 0;

    const quizId = this.activatedRoute.snapshot.paramMap.get('id');

    this.http.get<any[]>(`${environment.apiBaseUrl}/quizzes/getQuizQuestionsForQuiz?id=${quizId}`)
      .subscribe(quizQuestions => {
        this.quizQuestions = quizQuestions;
      });
  }
}
