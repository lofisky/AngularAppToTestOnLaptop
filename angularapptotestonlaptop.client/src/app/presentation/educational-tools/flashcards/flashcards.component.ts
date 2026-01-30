import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {
  flashcardSets: any[] = [];
  selectedTopic: string = 'Two pointers'; //default topic
  flashcardMessage: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchFlashcards(this.selectedTopic);
  }

  onTopicChange(event: any): void {
    this.selectedTopic = event.target.value;
    this.fetchFlashcards(this.selectedTopic);
  }

  fetchFlashcards(topic: string): void {
    this.flashcardMessage = '';

    this.http.get<any[]>(`https://localhost:7109/api/flashcards/getFlashcardSets?topic=${topic}`)
      .subscribe(flashcards => {
        if (flashcards && flashcards.length > 0) {
          this.flashcardSets = flashcards;
        }
        else {
          this.flashcardSets = [];
          this.flashcardMessage = 'No flashcard available for selected topic';
        }
      }, error => {
        this.flashcardMessage = 'Error fetching flashcards :(';
        console.error('Error fetching flashcards: ', error);
      })
  }
}
