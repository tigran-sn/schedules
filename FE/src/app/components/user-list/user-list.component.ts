import { Component, inject } from '@angular/core';

import { User } from '../../models';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  private userService: UserService = inject(UserService);

  users: User[] = [];
  isLoading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.isLoading = true;
    this.error = null;

    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (err) => {
        this.error = 'Failed to load users. Please try again later.';
        console.error('Error loading users:', err);
      },
      complete: () => (this.isLoading = false),
    });
  }
}
