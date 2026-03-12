import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tool-options-menu',
  templateUrl: './tool-options-menu.component.html',
  styleUrls: ['./tool-options-menu.component.css']
})
export class ToolOptionsMenuComponent {
  selectedTopic: string = 'Two pointers'; //default topic

  @Output() topicChanged = new EventEmitter<string>(); //define variable that gets emitted from this component

  onTopicChange(event: any) {
    this.selectedTopic = event.target.value; //extract the new event's value thats the new topic
    this.topicChanged.emit(this.selectedTopic); //send that selected topic into the variable
  }
}
