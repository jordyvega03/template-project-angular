import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private resource = 'users';
  private actionRegister = 'register';
  private actionLogin = 'login';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  register(userData: any): Observable<any> {
    console.log('Enviando datos al backend:', userData);
    return this.http.post(`${this.apiUrl}/${this.resource}/${this.actionRegister}/`, userData);
  }

  login(userData: any): Observable<any> {
    console.log('Login Realizado', userData);
    return this.http.post(`${this.apiUrl}/${this.resource}/${this.actionLogin}/`, userData);
  }

  storeToken(token: string) {
    console.log('🔐 Guardando token:', token); // 🔥 Verifica que se está guardando
    this.cookieService.set('access_token', token, 1, '/', '', true, 'Strict'); // 1 día de duración
  }

  getToken(): string {
    const token = this.cookieService.get('access_token');
    console.log('📥 Token obtenido:', token); // 🔥 Verifica si se obtiene el token
    return token;
  }

  logout() {
    console.log('❌ Eliminando token...');
    this.cookieService.delete('access_token');
  }
}
