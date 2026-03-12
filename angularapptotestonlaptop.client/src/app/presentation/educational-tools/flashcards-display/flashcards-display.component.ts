import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-flashcards-display',
  templateUrl: './flashcards-display.component.html',
  styleUrls: ['./flashcards-display.component.css']
})
export class FlashcardsDisplayComponent {
  flashcardSet: any;
  flashcards: any[] = [];
  currentIndex: number = 0;
  isFlipped: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    const flashcardSetId = this.route.snapshot.paramMap.get('id'); //get flashcardset id from this url

    this.http.get<any[]>(`${environment.apiBaseUrl}/flashcards/getFlashcardsForSet?id=${flashcardSetId}`)
      .subscribe(flashcards => {
        this.flashcards = flashcards;
        if (flashcards.length > 0) {
          this.flashcardSet = flashcards[0].flashcardSet;
        }
      });
  }

  redirectToFlashcardOptionsPage() {
    this.router.navigate(['/flashcards']);
  }

  flipCard(): void {
    this.isFlipped = !this.isFlipped; //toggle between front and back text
  }

  nextCard(): void {
    if (this.currentIndex < this.flashcards.length - 1) {
      this.currentIndex++;
      this.isFlipped = false; //res flip on next card
    }
  }

  prevCard(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.isFlipped = false; //res flip on new card
    }
  }
}
