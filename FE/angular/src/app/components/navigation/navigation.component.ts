import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HasRoleDirective } from '../../directives';
import { Roles } from '../../enums';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, HasRoleDirective],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  roles = Roles;
}
