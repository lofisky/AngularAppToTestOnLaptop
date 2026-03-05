import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  username: string = '';
  email: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.username = parsedUser.username;
      this.email = parsedUser.email;
    }
  }
  logOut() {
    localStorage.removeItem('currentUser');
    this.redirectToLoginPage();
  }

  redirectToLoginPage() {
    this.router.navigate(['']);
  }
}
