import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];
