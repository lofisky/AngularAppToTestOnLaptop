import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsDisplayComponent } from './flashcards-display.component';

describe('FlashcardsDisplayComponent', () => {
  let component: FlashcardsDisplayComponent;
  let fixture: ComponentFixture<FlashcardsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardsDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
