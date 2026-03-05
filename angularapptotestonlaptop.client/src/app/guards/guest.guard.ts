import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const user = localStorage.getItem('currentUser');

    if (user) { //if attempting to navigate to register or login page, log user out
      localStorage.removeItem('currentUser');
      this.router.navigate([''])
      return false; //block access to login/register if they are already logged in
    }
    return true; //allow access if user is not logged in
  } 
}
