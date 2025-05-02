import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  clickedWhileLoggedOut = '';

  // ⬅︎ make both injections **public** so the template can read them
  constructor(public auth: AuthService, public router: Router) {}

  markLink(name: string): void {
    if (!this.auth.isLoggedIn) this.clickedWhileLoggedOut = name;
  }

  logout(): void {
    this.auth.logout();
    this.clickedWhileLoggedOut = '';
    this.router.navigate(['/login']);
  }
}
