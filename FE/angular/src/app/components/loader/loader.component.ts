import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderService } from '../../services';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [CommonModule],
})
export class LoaderComponent {
  private loaderService: LoaderService = inject(LoaderService);
  loading = this.loaderService.loading;
}
