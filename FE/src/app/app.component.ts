import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AsyncPipe, RouterModule],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.authService.loadCurrentUser().subscribe((user) => {
      if (user) {
        console.log(user.email);
      } else {
        console.log('User not loaded yet.');
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
