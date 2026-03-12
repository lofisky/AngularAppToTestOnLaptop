import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ToolOptionsMenuComponent } from './tool-options-menu.component';
import { By } from '@angular/platform-browser';

describe('ToolOptionsMenuComponent', () => {
  let component: ToolOptionsMenuComponent;
  let fixture: ComponentFixture<ToolOptionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolOptionsMenuComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolOptionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default selected topic', () => {
    expect(component.selectedTopic).toBe('Two pointers');
  });

  it('should update selectedTopic and emit event when onTopicChange is called', () => {
    spyOn(component.topicChanged, 'emit'); //spy on EventEmitter from comp

    const fakeEvent = { target: { value: 'Hashmaps' } };
    component.onTopicChange(fakeEvent); //fake event to trigger the topic change that takes in an event to get the value

    expect(component.selectedTopic).toBe('Hashmaps'); //selectedtopic changed to the events topic
    expect(component.topicChanged.emit).toHaveBeenCalledWith('Hashmaps'); //event should be emitted with the new topic value
  });

  it('should trigger onTopicChange via template select element', () => {
    spyOn(component.topicChanged, 'emit'); //watch emit
    const selectEl = fixture.debugElement.query(By.css('select')); //select the select elements in the DOM

    selectEl.triggerEventHandler('change', { target: { value: 'Graphs' } }); //random topic that triggers the change
    fixture.detectChanges(); //detect the new topic change

    expect(component.selectedTopic).toBe('Graphs'); //the new topic should be this
    expect(component.topicChanged.emit).toHaveBeenCalledWith('Graphs'); //the topicchange should have emitted the new topic
  });
});
