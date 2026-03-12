import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizComponent } from './quiz.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{
        provide: ActivatedRoute, useValue: {
          snapshot: {
            paramMap: {
              get: () => '1' //mock the fake route parameter because the component needs it, not connecting to real url
            }
          }
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    fixture.detectChanges(); //again sort out initial request
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/quizzes/getQuizQuestionsForQuiz?id=1`);
    req.flush([]);

    expect(component).toBeTruthy(); //resolve
  });

  it('should load quiz questions on initialisation', () => {
    const mockQuestions = [{ question: 'Test Question', options: 'A/B/C/D', correctOptionsIndex: 1, quiz: { id: 1 }, quizTitle: 'Sample Quiz' }];
    fixture.detectChanges(); //to load the mock

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/quizzes/getQuizQuestionsForQuiz?id=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockQuestions); //recieved and detect
    fixture.detectChanges();

    expect(component.quizQuestions.length).toBe(1);
    expect(component.quizTitle).toBe('Sample Quiz');
    expect(component.selectedOptions.length).toBe(1);
  });

  it('should mark question as answered when selectOption() is called', () => {
    component.quizQuestions = [{ options: 'A/B/C/D', correctOptionsIndex: 0 }];
    component.selectedOptions = [''];
    component.answeredQuestions = [false];
    component.currentIndex = 0;
    component.selectOption('A');

    expect(component.selectedOptions[0]).toBe('A');
    expect(component.answeredQuestions[0]).toBe(true); //answered with correct index
  });

  it('should move to the next question when nextQuestion() is called', () => {
    component.quizQuestions = [{}, {}]; //can make empty for now
    component.currentIndex = 0;
    component.nextQuestion();

    expect(component.currentIndex).toBe(1);
  });

  it('should move to the previous question when prevQuestion() is called', () => {
    component.quizQuestions = [{}, {}];
    component.currentIndex = 1;

    component.prevQuestion();
    expect(component.currentIndex).toBe(0); //index changes like prev ones
  });

  it('should calculate score correctly', () => {
    component.quizQuestions = [{ options: 'A/B/C/D', correctOptionsIndex: 1 }, { options: 'True/False', correctOptionsIndex: 0 }];
    component.selectedOptions = ['B', 'True'];
    component.calculateScore();

    expect(component.score).toBe(2); //got both questions right
  });

  it('should not submit quiz if not all questions are answered', () => {
    component.quizQuestions = [{}, {}];
    component.answeredQuestions = [true, false]; //one of them isnt answered
    component.submitQuiz();

    expect(component.quizMessage).toBe('Please answer all quiz questions before submitting');
  });

  it('should navigate to results page if all questions answered', () => {
    const router = TestBed.inject(Router); //inject router to use same one as in component
    const routerSpy = spyOn(router, 'navigate'); //spy on nav
    component.quizTitle = 'Test Quiz';
    component.quizQuestions = [{}, {}];
    component.answeredQuestions = [true, true]; //everything is answered
    component.selectedOptions = ['A', 'B']; 

    spyOn(component, 'calculateScore').and.callFake(() => { component.score = 2; }); //use jasmine to spy on calcScore method, to replace with spy, and replace method with fake implementation of the scores to test nav
    component.submitQuiz();

    expect(routerSpy).toHaveBeenCalledWith(['/quiz-results'], { queryParams: { title: 'Test Quiz', score: 2, totalQuestions: 2 }}); //queryparams like in comp, reading link
  });

  afterEach(() => {
    httpMock.verify(); //check for clean requests at end
  });
});
