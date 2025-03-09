import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common'; 
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  alertMessage: string = '';
  alertType: 'success' | 'error' | 'warning' | 'info' = 'success';
  isLoading: boolean = false; // 🔥 Nuevo estado para el spinner

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.showAlertMessage('Username o contraseña incorrectos ❌', 'error');
      return;
    }

    const userData = {
      username: this.username,
      password: this.password
    };

    this.isLoading = true; // 🔥 Mostrar el spinner mientras procesa el login

    this.authService.login(userData).subscribe({
      next: (response) => {
        console.log('✅ Login exitoso:', response);

        if (response.status === 200 && response.data?.access_token) {
          this.authService.storeToken(response.data.access_token);
          this.showAlertMessage('Login exitoso 🎉', 'success');

          // 🔥 Mantener el spinner hasta que la alerta desaparezca y luego redirigir
          setTimeout(() => {
            this.isLoading = false; // Ocultar el spinner
            console.log('🔄 Redirigiendo a /chat...');
            this.router.navigateByUrl('/chat');
          }, 3000);
        } else {
          this.showAlertMessage('Respuesta inesperada del servidor ❌', 'error');
          this.isLoading = false; // 🔥 Ocultar el spinner en caso de error
        }

        this.resetForm(form);
      },
      error: (err) => {
        console.error('❌ Error en el login:', err);
        this.showAlertMessage('Error en el login. Inténtalo de nuevo ❌', 'error');
        this.isLoading = false; // 🔥 Ocultar el spinner en caso de error
      }
    });
  }

  showAlertMessage(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    this.alertMessage = ''; 
    setTimeout(() => {
      this.alertMessage = message;
      this.alertType = type;
    }, 10);
  }

  resetForm(form: NgForm) {
    form.resetForm();
  }

  goToSignUp() {
    this.router.navigate(['/register']);
  }
}
