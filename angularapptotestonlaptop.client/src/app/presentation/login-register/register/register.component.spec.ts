import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show message if any field is empty', () => {
    component.username = '';
    component.userEmail = '';
    component.userPassword = '';
    component.register();
    expect(component.registerMessage).toBe('Please fill in all fields.'); //same msg as component
  });

  it('should call API and show success message on successful registration', fakeAsync(() => { //again using this as component uses this http post subscribe which as async methods
    component.username = 'TestUser';
    component.userEmail = 'test@example.com';
    component.userPassword = 'password123'; //fake credentials for test
    component.register();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/auth/register`); //catch http request component makes with expectOne()
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'TestUser', userEmail: 'test@example.com', userPassword: 'password123' }); //ensure user registration data was sent in the request

    req.flush(true); //stimulate acceptance/success of user register, as component expects boolean in success block
    tick(); //pass fake time to load

    expect(component.registerMessage).toBe('Profile Created! Welcome to DSArena, TestUser'); //fake message matching component one that gets displayed
  }));

  it('should show error message on 400 response', fakeAsync(() => {
    component.username = 'TestUser';
    component.userEmail = 'duplicate@example.com';
    component.userPassword = 'password123';
    component.register();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/auth/register`);
    req.flush({ message: 'Email already exists' }, { status: 400, statusText: 'Bad Request' }); //mock error for email existence for example
    tick(); //pass fake time
    expect(component.registerMessage).toBe('Email already exists'); //check if msg displays on 400
  }));

  it('should show generic error message on server error', fakeAsync(() => {
    component.username = 'TestUser';
    component.userEmail = 'test@example.com';
    component.userPassword = 'password123';
    component.register();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/auth/register`);
    req.flush(null, { status: 500, statusText: 'Server Error' });
    tick();
    expect(component.registerMessage).toBe('Registration failed. Please try again.'); //any other generic error same as comp
  }));

  it('should redirect to login page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.redirectToLoginPage();
    expect(navigateSpy).toHaveBeenCalledWith(['']); //base url for login
  });

  afterEach(() => {
    httpMock.verify(); //clear waiting requests 
  });
});
