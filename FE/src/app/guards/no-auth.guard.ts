import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  canActivate(): boolean {
    if (this.authService.getToken()) {
      this.router.navigate(['/schedule']);
      return false;
    }
    return true;
  }
}
