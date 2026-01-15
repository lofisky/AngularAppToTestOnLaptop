import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  userEmail: string = '';
  userPassword: string = '';
  registerMessage: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  createProfileRedirect() {
    this.http.post<boolean>('https://localhost:7109/api/auth/register', {
      username: this.username,
      userEmail: this.userEmail,
      userPassword: this.userPassword
    }).subscribe(success => {
      if (success) {
        this.registerMessage = `Profile Created! Welcome to DSArena, ${this.userEmail}`;
        console.log("register success!Q!");
      }
      else {
        alert('Cannot create profile. Select unique credentials');
      }
    }, error => {
      this.registerMessage = 'errorrrr';
      console.error(error);
    });
  }
}
