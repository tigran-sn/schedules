import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NotFound } from './components/not-found/not-found.component';
import { RoleGuard } from './guards/role.guard';
import { Roles } from './enums';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

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
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Roles.ADMIN] },
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Roles.GENERAL, Roles.ADMIN] },
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  { path: '**', component: NotFound },
];
