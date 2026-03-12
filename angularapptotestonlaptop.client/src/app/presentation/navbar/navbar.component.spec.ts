import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule] //needed for routerLink from comp's html
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent); //create the navbar comp
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide links on / route', () => {
    component.currentRoute = '/';
    fixture.detectChanges();

    const linksDiv = fixture.debugElement.query(By.css('#navbarLinksDiv')); //debugElement allows access for DOM elements, and query is a method on debugElement that allows searching and matching an element with a condition, in this case its using the css to query elements with the selector
    expect(linksDiv).toBeNull(); //selected div should not exist
  });

  it('should hide links on /register route', () => {
    component.currentRoute = '/register'; 
    fixture.detectChanges();
    const linksDiv = fixture.debugElement.query(By.css('#navbarLinksDiv')); //again find the navbarlinksdiv, it shouldnt exist
    expect(linksDiv).toBeNull();
  });

  it('should show links on other routes', () => {
    component.currentRoute = '/homepage';
    fixture.detectChanges();

    const linksDiv = fixture.debugElement.query(By.css('#navbarLinksDiv'));
    expect(linksDiv).not.toBeNull(); //navbar links div should exist on any other pages

    const links = linksDiv.queryAll(By.css('li')); //query returns 1 element but queryAll returns multiple, anything that matches li inside the linksDiv
    expect(links.length).toBe(6); //confirm all 6 links are present
  });
});
