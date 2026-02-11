import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quizTitle: string = '';
  quiz: any;
  quizQuestions: any[] = [];
  currentIndex: number = 0; //keep track of current question being displayed
  selectedOptions: string[] = []; //check ans
  answeredQuestions: boolean[] = []; //check for allowing to submit
  quizMessage: string = '';
  score: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    const quizId = this.activatedRoute.snapshot.paramMap.get('id'); //get quiz id from this url

    this.http.get<any[]>(`https://localhost:7109/api/quizzes/getQuizQuestionsForQuiz?id=${quizId}`)
      .subscribe(quizQuestions => {
        this.quizQuestions = quizQuestions;
        this.selectedOptions = new Array(quizQuestions.length).fill(''); //initialise empty for now
        this.answeredQuestions = new Array(quizQuestions.length).fill(false);
        if (quizQuestions.length > 0) {
          this.quiz = quizQuestions[0].quiz;
          this.quizTitle = quizQuestions[0].quizTitle; //extract info
        }
      });
  }

  redirectToQuizOptionsPage() {
    this.router.navigate(['/quizzes']);
  }

  selectOption(option: string): void {
    this.selectedOptions[this.currentIndex] = option; //selected and answered at this question is this
    this.answeredQuestions[this.currentIndex] = true;
  }

  submitQuiz(): void {
    if (this.allQuestionsAnswered()) {
      this.calculateScore();
      this.router.navigate(['/quiz-results'], {
        queryParams: { title: this.quizTitle, score: this.score, totalQuestions: this.quizQuestions.length } //send info
      });
    } else {
      this.quizMessage = 'Please answer all quiz questions before submitting';
    }
  }

  nextQuestion(): void {
    if (this.currentIndex < this.quizQuestions.length - 1) {
      this.currentIndex++;
      this.quizMessage = ''; //res msg if page change
    }
  }

  prevQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.quizMessage = ''; //res msg if page change
    }
  }

  allQuestionsAnswered(): boolean {
    return this.answeredQuestions.every(answered => answered); //check if all questions are answered
  }

  calculateScore(): void {
    this.score = this.selectedOptions.reduce((score, option, index) => {
      if (option === this.quizQuestions[index].options.split('/')[this.quizQuestions[index].correctOptionsIndex]) { //compare each ans to correct ans on each page
        return score + 1;
      }
      return score;
    }, 0); //optional initial val so for score its 0 for now
  }
}
