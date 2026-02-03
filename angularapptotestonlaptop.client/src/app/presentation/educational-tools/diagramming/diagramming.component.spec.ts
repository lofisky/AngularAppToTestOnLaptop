import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagrammingComponent } from './diagramming.component';

describe('DiagrammingComponent', () => {
  let component: DiagrammingComponent;
  let fixture: ComponentFixture<DiagrammingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagrammingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagrammingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
