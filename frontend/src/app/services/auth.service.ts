import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap }        from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  /* ---------- public API ---------- */

  /** POST /auth/login – saves JWT to localStorage */
  login(creds: { username: string; password: string }) {
    return this.http
      .post<{ token: string }>(`${this.api}/auth/login`, creds)
      .pipe(tap(r => localStorage.setItem('token', r.token)));
  }

  /** Clear token and log out */
  logout(): void {
    localStorage.removeItem('token');
  }

  /** 🔹 Getter 1: current token (null if none) */
  get token(): string | null {
    return localStorage.getItem('token');
  }

  /** 🔹 Getter 2: true ↔ user is authenticated */
  get isLoggedIn(): boolean {
    return !!this.token;
  }
}
