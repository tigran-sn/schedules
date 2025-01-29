import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  canActivate(): boolean {
    if (this.authService.getToken()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
