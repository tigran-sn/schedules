import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NotFound } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { isAuthPage: true },
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFound },
];
