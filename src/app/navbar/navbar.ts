import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication-service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.html'
})
export class Navbar implements OnInit {
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  isLoggedIn = false;


  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
