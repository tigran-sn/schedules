import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';
import { LoaderComponent } from './components/loader/loader.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AsyncPipe, RouterModule, LoaderComponent, NavigationComponent],
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
