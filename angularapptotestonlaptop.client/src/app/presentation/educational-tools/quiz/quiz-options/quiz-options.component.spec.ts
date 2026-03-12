import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ToolOptionsMenuComponent } from '../../../tool-options-menu/tool-options-menu.component';
import { environment } from '../../../../../environments/environment';

import { QuizOptionsComponent } from './quiz-options.component';

describe('QuizOptionsComponent', () => {
  let component: QuizOptionsComponent;
  let fixture: ComponentFixture<QuizOptionsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizOptionsComponent, ToolOptionsMenuComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizOptionsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    fixture.detectChanges(); //handle initial request
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/quizzes/getQuizzes?topic=Two pointers`);
    req.flush([]);
    expect(component).toBeTruthy();
  });

  it('should fetch quizzes on component initialisation', () => {
    const mockQuizzes = [{ quizId: 1, title: 'Sample Quiz' }];
    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/quizzes/getQuizzes?topic=Two pointers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockQuizzes);
    fixture.detectChanges();

    expect(component.quizzes.length).toBe(1);
    expect(component.quizzes[0].quizId).toBe(1);
  });

  it('should handle empty quiz response', () => {
    fixture.detectChanges(); //clean up initial request
    const initialReq = httpMock.expectOne(`${environment.apiBaseUrl}/quizzes/getQuizzes?topic=Two pointers`);
    initialReq.flush([]);

    component.fetchQuizzes('Invalid Topic');
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/quizzes/getQuizzes?topic=Invalid Topic`);
    req.flush([]); //fake url response
    fixture.detectChanges();

    expect(component.quizzes.length).toBe(0);
    expect(component.quizMessage).toBe('No quiz available for selected topic'); //same error msg as component
  });

  it('should handle error when fetching quizzes', () => {
    fixture.detectChanges();
    const initialReq = httpMock.expectOne(`${environment.apiBaseUrl}/quizzes/getQuizzes?topic=Two pointers`);
    initialReq.flush([]); //clean initial request again

    component.fetchQuizzes('Two pointers');

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/quizzes/getQuizzes?topic=Two pointers`);
    req.flush(null, { status: 500, statusText: 'Server Error' }); //mock server error

    fixture.detectChanges();
    expect(component.quizzes.length).toBe(0);
    expect(component.quizMessage).toBe('Error fetching quizzes :('); //also same error catching message
  });

  it('should redirect to quizzes display page with valid quizId', () => {
    const router = TestBed.inject(Router);
    const routerSpy = spyOn(router, 'navigate'); //spy on same router/nav as comp 

    const mockQuiz = { quizId: 1 };
    component.redirectToQuizzesDisplayPage(mockQuiz);

    expect(routerSpy).toHaveBeenCalledWith(['/quizzes-display', mockQuiz.quizId]); //check if nav works with that id
  });

  it('should not redirect if quizId is invalid', () => {
    const router = TestBed.inject(Router);
    const routerSpy = spyOn(router, 'navigate');

    const mockQuiz = { quizId: 0 };
    component.redirectToQuizzesDisplayPage(mockQuiz);

    expect(routerSpy).not.toHaveBeenCalled(); //similar as before but 0 is not a valid id so it shouldnt go
  });

  it('should change topic and fetch quizzes when onTopicChange is called', () => {
    fixture.detectChanges();
    const initialReq = httpMock.expectOne(`${environment.apiBaseUrl}/quizzes/getQuizzes?topic=Two pointers`);
    initialReq.flush([]); //clean initial req

    const newTopic = 'Hashmaps';
    component.onTopicChange({ target: { value: newTopic } }); //emit the changed event to call the fetch quizzes method on the component to fetch the new quizzes

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/quizzes/getQuizzes?topic=${newTopic}`);
    req.flush([{ quizId: 1, title: 'Hashmap Quiz' }]); //fake quiz

    fixture.detectChanges();
    expect(component.selectedTopic).toBe(newTopic);
    expect(component.quizzes.length).toBe(1);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
