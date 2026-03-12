import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FlashcardsDisplayComponent } from './flashcards-display.component';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

describe('FlashcardsDisplayComponent', () => {
  let component: FlashcardsDisplayComponent;
  let fixture: ComponentFixture<FlashcardsDisplayComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlashcardsDisplayComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{
        provide: ActivatedRoute, useValue: {
          snapshot: {
            paramMap: {
              get: () => '123'
            }
          }
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardsDisplayComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    fixture.detectChanges(); //trigger init to call api
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/flashcards/getFlashcardsForSet?id=123`); //expect the specified call
    req.flush([]);  //resolve the request so 'verify()' check passes
    expect(component).toBeTruthy();
  });

  it('should initialise with empty flashcards array and current index set to 0', () => {
    expect(component.flashcards.length).toBe(0);
    expect(component.currentIndex).toBe(0);
  });

  it('should load flashcards from the API on initialisation', () => {
    const mockFlashcards = [
      { id: 1, front: 'Question 1', back: 'Answer 1', flashcardSet: 'Set 1' },
      { id: 2, front: 'Question 2', back: 'Answer 2', flashcardSet: 'Set 1' }
    ];

    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/flashcards/getFlashcardsForSet?id=123`);
    req.flush(mockFlashcards);
    

    expect(component.flashcards.length).toBe(2);
    expect(component.flashcards[0].front).toBe('Question 1');
    expect(component.flashcards[1].back).toBe('Answer 2');
  });

  it('should toggle card flip state when flipCard() is called', () => {
    component.isFlipped = false;
    component.flipCard();
    expect(component.isFlipped).toBe(true); //should flip to the back side

    component.flipCard();
    expect(component.isFlipped).toBe(false); //should flip back to the front side
  });


  it('should navigate to the flashcard options page when redirectToFlashcardOptionsPage() is called', () => {
    const router = TestBed.inject(Router); //inject the router from the testbed
    const routerSpy = spyOn(router, 'navigate');
    component.redirectToFlashcardOptionsPage();
    expect(routerSpy).toHaveBeenCalledWith(['/flashcards']);
  });

  it('should move to the next card when nextCard() is called', () => {
    component.flashcards = [{ id: 1, front: 'Question 1', back: 'Answer 1' }, { id: 2, front: 'Question 2', back: 'Answer 2' }];
    component.currentIndex = 0;
    component.nextCard();
    expect(component.currentIndex).toBe(1); //add 1 to index after next
    expect(component.isFlipped).toBe(false); //should reset flip state
  });

  it('should move to the previous card when prevCard() is called', () => {
    component.flashcards = [{ id: 1, front: 'Question 1', back: 'Answer 1' }, { id: 2, front: 'Question 2', back: 'Answer 2' }];
    component.currentIndex = 1;
    component.prevCard();
    expect(component.currentIndex).toBe(0); //opposite as prev test
    expect(component.isFlipped).toBe(false);//should reset flip state
  });

  afterEach(() => {
    httpMock.verify(); //ensure no outstanding api requests are left, cleans it up
  });

});
