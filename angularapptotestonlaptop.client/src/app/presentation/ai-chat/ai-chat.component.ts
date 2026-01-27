import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent {
  userMessage: string = '';
  messages: { content: string, sender: 'user' | 'ai' }[] = []; //arr of objs
  isAiTyping: boolean = false;

  constructor(private http: HttpClient) { }

  sendMessage() {
    if (this.isAiTyping == true || !this.userMessage.trim()) return; //if empty message

    this.messages.push({ content: this.userMessage, sender: 'user' });

    this.isAiTyping = true;

    this.http.post<any>('https://localhost:7109/api/askAi/sendQuery', { userMessage: this.userMessage }).subscribe(
      (response) => {
        if (response && response.aiResponse) { //empty or null
          this.messages.push({ content: response.aiResponse, sender: 'ai' });
        }
        else {
          this.messages.push({ content: 'No response from AI', sender: 'ai' }); //add obj to obj arr
        }
        this.isAiTyping = false;
      },
      (error) => {
        this.messages.push({ content: 'Error, couldnt get ai response', sender: 'ai' });
        console.error('AI request failed :c', error);
        this.isAiTyping = false;
      }
    );
    this.userMessage = ''; //clear input field after
  }
}
