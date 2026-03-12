import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlashcardsComponent } from './flashcards.component';
import { FormsModule } from '@angular/forms';
import { ToolOptionsMenuComponent } from '../../tool-options-menu/tool-options-menu.component';
import { environment } from '../../../../environments/environment';

describe('FlashcardsComponent', () => {
  let component: FlashcardsComponent;
  let fixture: ComponentFixture<FlashcardsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlashcardsComponent, ToolOptionsMenuComponent],
      imports: [HttpClientTestingModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    fixture.detectChanges(); //trigger init to call api
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/flashcards/getFlashcardSets?topic=Two pointers`);
    req.flush([]);  //resolve the request so 'verify()' check passes
    expect(component).toBeTruthy();
  });

  it('should fetch flashcards on component initialisation', () => {
    const mockFlashcards = [{ flashcardSetId: 1, name: 'Sample Flashcard Set' }];

    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/flashcards/getFlashcardSets?topic=Two pointers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFlashcards); //mocking the API response

    fixture.detectChanges();

    expect(component.flashcardSets.length).toBe(1);
    expect(component.flashcardSets[0].flashcardSetId).toBe(1);
    expect(component.flashcardSets[0].name).toBe('Sample Flashcard Set');
  });

  it('should handle empty flashcards response', () => {
    fixture.detectChanges(); //initialise component to trigger the 'two pointers' request
    const initialReq = httpMock.expectOne(`${environment.apiBaseUrl}/flashcards/getFlashcardSets?topic=Two pointers`);
    initialReq.flush([]); //clear background request from ngOnInit

    component.selectedTopic = 'Invalid Topic';
    component.fetchFlashcards(component.selectedTopic);

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/flashcards/getFlashcardSets?topic=Invalid Topic`);
    req.flush([]); //simulating empty response from the API
    fixture.detectChanges();

    expect(component.flashcardSets.length).toBe(0);
    expect(component.flashcardMessage).toBe('No flashcard available for selected topic');
  });

  it('should handle error while fetching flashcards', () => {
    fixture.detectChanges(); //initialise component to trigger the 'two pointers' request
    const initialReq = httpMock.expectOne(`${environment.apiBaseUrl}/flashcards/getFlashcardSets?topic=Two pointers`);
    initialReq.flush([]); //clear background request from ngOnInit

    const mockError = 'Error fetching flashcards :(';
    component.selectedTopic = 'Two pointers';
    component.fetchFlashcards(component.selectedTopic);

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/flashcards/getFlashcardSets?topic=Two pointers`);
    req.flush(null, { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();

    expect(component.flashcardSets.length).toBe(0);
    expect(component.flashcardMessage).toBe(mockError);
  });

  it('should redirect to flashcards display page with valid flashcardSetId', () => {
    const mockFlashcardSet = { flashcardSetId: 1, name: 'Sample Flashcard Set' };
    const navigateSpy = spyOn(component['router'], 'navigate');  //spying on the navigate method
    component.redirectToFlashcardsDisplayPage(mockFlashcardSet);

    expect(navigateSpy).toHaveBeenCalledWith(['/flashcards-display', mockFlashcardSet.flashcardSetId]);
  });

  it('should not redirect to flashcards display page with invalid flashcardSetId', () => {
    const mockFlashcardSet = { flashcardSetId: 0, name: 'Invalid Flashcard Set' };
    const navigateSpy = spyOn(component['router'], 'navigate');  //spying on the navigate method
    component.redirectToFlashcardsDisplayPage(mockFlashcardSet);

    expect(navigateSpy).not.toHaveBeenCalled();  //navigation should not happen
  });

  it('should change selected topic and fetch corresponding flashcards', () => {
    fixture.detectChanges(); //initialise component to trigger the 'two pointers' request
    const initialReq = httpMock.expectOne(`${environment.apiBaseUrl}/flashcards/getFlashcardSets?topic=Two pointers`);
    initialReq.flush([]); //clear background request from ngOnInit

    const mockFlashcards = [{ flashcardSetId: 1, name: 'Sample Flashcard Set' }];
    const newTopic = 'Hashmaps';
    component.onTopicChange({ target: { value: newTopic } });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/flashcards/getFlashcardSets?topic=${newTopic}`);
    req.flush(mockFlashcards);

    fixture.detectChanges();

    expect(component.selectedTopic).toBe(newTopic);
    expect(component.flashcardSets.length).toBe(1);
  });


  afterEach(() => {
    httpMock.verify(); //ensure no outstanding api requests are left, cleans it up
  });
});
