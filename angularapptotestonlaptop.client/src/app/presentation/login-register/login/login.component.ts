import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginMessage: string = '';
  constructor(private router: Router, private http: HttpClient) { }

  redirectToRegisterPage() {
    this.router.navigate(['/register']);
  }

  redirectToHomePage() {
    this.router.navigate(['/homepage']);
  }

  login() {
    this.email = this.email.trim().replace(/\S+/g, ''); //trim spaces and remove inner whitespaces
    this.password = this.password.trim().replace(/\S+/g, '');

    if (this.email && this.password) {
      this.http.post<{ username: string, email: string }>('https://localhost:7109/api/auth/login', {
        email: this.email,
        password: this.password
      }).subscribe(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));

          this.loginMessage = `Login succeeded! Welcome, ${user.username}`;
          console.log("login success!Q!");
        }
      }, error => {
        this.loginMessage = 'errorrrr';
        console.error(error);
      });
    }
    else {
      this.loginMessage = 'Please fill in all fields.';
    }
  }
}
