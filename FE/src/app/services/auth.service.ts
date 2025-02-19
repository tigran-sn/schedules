import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly http: HttpClient = inject(HttpClient);
  private readonly platformId: Object = inject(PLATFORM_ID);
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();

  getRole(): number {
    return this.currentUserSubject.value?.user_role ?? 0;
  }

  loadCurrentUser(): Observable<User | null> {
    if (!this.getToken()) {
      return of(null);
    }

    return this.http.get<User>(`${environment.apiUrl}/users/current`).pipe(
      tap((user: User) => {
        this.currentUserSubject.next(user);
      }),
      catchError((err) => {
        console.error('Failed to load user:', err);
        return of(null);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((response: any) => {
          if (isPlatformBrowser(this.platformId)) {
            this.setToken(response.token);
          }
        }),
        switchMap(() => this.loadCurrentUser())
      );
  }

  logout(): void {
    this.removeToken();
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  removeToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.removeItem(this.TOKEN_KEY);
    }
  }
}
