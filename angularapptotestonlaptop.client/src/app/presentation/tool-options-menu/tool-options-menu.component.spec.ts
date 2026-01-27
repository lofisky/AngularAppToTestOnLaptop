import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolOptionsMenuComponent } from './tool-options-menu.component';

describe('ToolOptionsMenuComponent', () => {
  let component: ToolOptionsMenuComponent;
  let fixture: ComponentFixture<ToolOptionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolOptionsMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolOptionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
