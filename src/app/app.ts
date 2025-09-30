import {Component, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <ng-container>
      <div class="navbar bg-base-100 shadow-sm">
        <div class="navbar-start">
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>

          </div>
          <a class="btn btn-ghost text-xl" [routerLink]="['/']">Social Network</a>
        </div>
        <div class="navbar-end">
          <a [routerLink]="['/login']" class="btn">Login</a>
        </div>
      </div>
      <router-outlet />
    </ng-container>

  `
})
export class App {
  protected readonly title = signal('social-network-frontend');
}
