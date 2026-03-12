import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProfileViewComponent } from './profile-view.component';

describe('ProfileViewComponent', () => {
  let component: ProfileViewComponent;
  let fixture: ComponentFixture<ProfileViewComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']); //router spy to check navigation, added here to reduce duplication as the component expects router to exist, and so most tests may need it

    await TestBed.configureTestingModule({
      declarations: [ProfileViewComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user info from localStorage on ngOnInit', () => {
    const mockUser = { username: 'TestUser', email: 'test@example.com' }; //fake user to put in localstorage
    localStorage.setItem('currentUser', JSON.stringify(mockUser));

    fixture.detectChanges(); //triggers ngOnInit to get user info from storage

    expect(component.username).toBe('TestUser');
    expect(component.email).toBe('test@example.com'); //check if credentials were loaded into localstorage correctly
  });

  it('should remove user from localStorage and redirect on logOut', () => {
    const mockUser = { username: 'TestUser', email: 'test@example.com' };
    localStorage.setItem('currentUser', JSON.stringify(mockUser)); //put fake user in localstorage

    component.logOut(); //removing the user from localstorage

    expect(localStorage.getItem('currentUser')).toBeNull(); //user removed
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']); //redirected to login that is the default url
  });

  afterEach(() => {
    localStorage.clear(); //clean localStorage after each test to prevent unexpected saved user profile data from other tests
  });
});
