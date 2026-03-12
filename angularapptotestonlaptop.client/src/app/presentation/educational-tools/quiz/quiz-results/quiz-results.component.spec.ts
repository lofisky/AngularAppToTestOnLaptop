import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuizResultsComponent } from './quiz-results.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

describe('QuizResultsComponent', () => {
  let component: QuizResultsComponent;
  let fixture: ComponentFixture<QuizResultsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizResultsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            queryParamMap: {
              get: (param: string) => { //in quiz res comp the code extracts quiz title score total questions from the snapshot so this is mocking that style to return fake but accessible data required from the url, this time fake
                if (param === 'title') return 'Sample Quiz';
                if (param === 'score') return '3';
                if (param === 'totalQuestions') return '5';
                return null;
              }
            },
            paramMap: {
              get: () => '1' //faking router param quiz id, parammap belongs in the path but the queryparammap after the ? are the optional info to go elsewhere
            }
          }
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizResultsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    fixture.detectChanges(); //clean initial req
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/quizzes/getQuizQuestionsForQuiz?id=1`);
    req.flush([]);
    expect(component).toBeTruthy();
  });

  it('should read query parameters correctly', () => {
    fixture.detectChanges(); //trigger ngOnInit because that sends the http request
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/quizzes/getQuizQuestionsForQuiz?id=1`);
    req.flush([]); //fake server response

    expect(component.quizTitle).toBe('Sample Quiz');
    expect(component.score).toBe(3);
    expect(component.totalQuestions).toBe(5); //capture fake defined queryparams from before
  });

  it('should load quiz questions from the API on initialisation', () => {
    const mockQuestions = [{ question: 'Q1', options: 'A/B/C/D', correctOptionsIndex: 1 }, { question: 'Q2', options: 'True/False', correctOptionsIndex: 0 }];
    fixture.detectChanges(); //run angular change detection again to trigger ngoninit as its part of inialisation logic which change checks

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/quizzes/getQuizQuestionsForQuiz?id=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockQuestions);
    fixture.detectChanges();

    expect(component.quizQuestions.length).toBe(2);
    expect(component.quizQuestions[0].question).toBe('Q1'); //checking if its defined question
  });

  it('should navigate back to quiz options page', () => {
    const router = TestBed.inject(Router);
    const routerSpy = spyOn(router, 'navigate'); //spy on router for same version as comp and check on navigate
    component.redirectToQuizOptionsPage();
    expect(routerSpy).toHaveBeenCalledWith(['/quizzes']); //should be able to go back to quizzes
  });

  afterEach(() => {
    httpMock.verify();
  });
});
