import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFound {
  private router: Router = inject(Router);

  goToHome(): void {
    this.router.navigateByUrl('/login');
  }
}
