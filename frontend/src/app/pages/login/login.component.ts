import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { AuthService }  from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username = '';
  password = '';
  error    = '';
  clickedWhileLoggedOut = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit(): void {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
  
    this.auth.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          // force router to recalc active links, then go to returnUrl
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.clickedWhileLoggedOut = '';   
            this.router.navigateByUrl(returnUrl)
        });
        },
        error: () => this.error = 'Invalid credentials'
      });
  }
}

