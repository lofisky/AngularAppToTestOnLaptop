import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tool-options-menu',
  templateUrl: './tool-options-menu.component.html',
  styleUrls: ['./tool-options-menu.component.css']
})
export class ToolOptionsMenuComponent {
  selectedTopic: string = 'Two pointers'; //default topic

  @Output() topicChanged = new EventEmitter<string>();

  onTopicChange(event: any) {
    this.selectedTopic = event.target.value;
    this.topicChanged.emit(this.selectedTopic);
  }
}
