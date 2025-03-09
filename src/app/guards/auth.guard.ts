import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    console.log('🔑 Token en AuthGuard:', token); // 🔥 Verificar token

    if (!token) {
      console.warn('⛔ Acceso denegado: No hay token.');
      this.router.navigate(['/login']);
      return false;
    }
    
    return true;
  }
}
