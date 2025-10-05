import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth/login'; // Backend auth endpoint

  constructor(private http: HttpClient) {}

  login(password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { password }).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.access_token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
