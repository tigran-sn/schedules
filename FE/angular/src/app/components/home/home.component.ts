import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { AuthService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [AsyncPipe],
})
export class HomeComponent {
  public authService = inject(AuthService);
  public router = inject(Router);
}
