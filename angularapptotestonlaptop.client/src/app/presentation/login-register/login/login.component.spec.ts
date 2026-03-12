import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show message if email or password is empty', () => {
    component.email = '';
    component.password = '';
    component.login();
    expect(component.loginMessage).toBe('Please fill in all fields.'); //same message as component
  });

  it('should call API and store user on successful login', fakeAsync(() => { //use fake async to wait as component's http post subscibe is asynchronous so match that
    component.email = 'test@example.com';
    component.password = 'password123'; //fake credentials
    const navigateSpy = spyOn(router, 'navigate'); //watch nav
    component.login();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@example.com', password: 'password123' }); //should include profile credentials in request

    req.flush({ username: 'TestUser', email: 'test@example.com' }); //fake api response

    tick(); //simulate async, make the fake time go past so request can run

    expect(localStorage.getItem('currentUser')).toBe(JSON.stringify({ username: 'TestUser', email: 'test@example.com' })); //same jason stringify/formatting as component
    expect(navigateSpy).toHaveBeenCalledWith(['/homepage']); //should have went to homepage on successful login
    expect(component.loginMessage).toBe(''); //no message if success
  }));

  it('should show error message on login failure', fakeAsync(() => {
    component.email = 'test@example.com';
    component.password = 'wrongpassword';
    component.login();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/auth/login`);
    req.flush(null, { status: 401, statusText: 'Unauthorised' }); //wrong error
    tick(); //simulate async by moving time forward

    expect(component.loginMessage).toBe('Login failed. Please check your credentials.'); //same error msg as comp
  }));

  it('should redirect to register page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.redirectToRegisterPage();
    expect(navigateSpy).toHaveBeenCalledWith(['/register']); //expect url change
  });

  it('should redirect to home page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.redirectToHomePage();
    expect(navigateSpy).toHaveBeenCalledWith(['/homepage']); //same as before but homepage
  });

  afterEach(() => {
    httpMock.verify(); //clean awaiting requests
  });
});
