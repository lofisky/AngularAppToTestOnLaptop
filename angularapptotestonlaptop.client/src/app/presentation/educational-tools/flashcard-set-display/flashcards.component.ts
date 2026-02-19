import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {
  flashcardSets: any[] = [];
  selectedTopic: string = 'Two pointers'; //default topic
  flashcardMessage: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchFlashcards(this.selectedTopic);
  }

  redirectToFlashcardsDisplayPage(flashcardSet: any) {
    console.log('Navigating to flashcards display with ID:', flashcardSet.flashcardSetId);

    if (flashcardSet.flashcardSetId && flashcardSet.flashcardSetId > 0) {
      this.router.navigate(['/flashcards-display', flashcardSet.flashcardSetId]);
    } else {
      console.error('Invalid flashcardSetId:', flashcardSet);
    }
  }

  onTopicChange(event: any): void {
    this.selectedTopic = event.target.value;
    this.fetchFlashcards(this.selectedTopic);
  }

  onTopicChangedFromMenu(topic: string): void {
    this.selectedTopic = topic;
    this.fetchFlashcards(topic);
  }

  fetchFlashcards(topic: string): void {
    this.flashcardMessage = '';

    this.http.get<any[]>(`${environment.apiBaseUrl}/flashcards/getFlashcardSets?topic=${topic}`)
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
