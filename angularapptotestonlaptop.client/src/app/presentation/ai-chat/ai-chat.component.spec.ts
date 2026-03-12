import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AiChatComponent } from './ai-chat.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

describe('AiChatComponent', () => {
  let component: AiChatComponent;
  let fixture: ComponentFixture<AiChatComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiChatComponent],
      imports: [HttpClientTestingModule, FormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiChatComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add user message to messages array when sendMessage() is called', () => {
    component.userMessage = 'Hello';
    component.sendMessage();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/askAi/sendQuery`);
    req.flush({ aiResponse: 'Hi' });

    expect(component.messages.length).toBe(2);
    expect(component.messages[0].content).toBe('Hello');
    expect(component.messages[0].sender).toBe('user'); //check if the message is in the messages array and its sent by the user with the correct message
  });

  it('should call the AI API and add AI response to messages', () => {
    const mockAiResponse = { aiResponse: 'Hello! How can I help you?' };
    component.userMessage = 'Hi';
    component.sendMessage();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/askAi/sendQuery`);
    expect(req.request.method).toBe('POST');
    req.flush(mockAiResponse);

    fixture.detectChanges();

    expect(component.messages.length).toBe(2);
    expect(component.messages[1].content).toBe('Hello! How can I help you?');
    expect(component.messages[1].sender).toBe('ai');
  });

  it('should handle error response well', () => {
    const mockError = 'Error, couldnt get ai response';
    component.userMessage = 'Test error';
    component.sendMessage();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/askAi/sendQuery`);
    req.flush(null, { status: 500, statusText: 'Server Error' }); //mock response

    fixture.detectChanges();

    expect(component.messages.length).toBe(2);
    expect(component.messages[1].content).toBe(mockError); //ai response is after user
    expect(component.messages[1].sender).toBe('ai');
  });

  it('should not send message if userMessage is empty or only spaces', () => {
    component.userMessage = '   ';
    component.sendMessage();
    expect(component.messages.length).toBe(0); //no message should be added
  });

  afterEach(() => {
    httpMock.verify(); //ensure no outstanding api requests are left, cleans it up
  });
});
