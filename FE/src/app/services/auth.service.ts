import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private currentUserSubject = new BehaviorSubject<any>(null);
  private http: HttpClient = inject(HttpClient);

  currentUser$ = this.currentUserSubject.asObservable();
  platformId: any;

  ngOnInit(): void {
    console.log(isPlatformBrowser(this.platformId));
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('token')) {
        this.currentUserSubject.next({ token: localStorage.getItem('token') });
      }
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
