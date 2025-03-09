import { Component } from '@angular/core';
import { NgIf } from '@angular/common'; 
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // 🔥 Importar Router
import { AuthService } from '../../services/auth.service';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, FormsModule, AlertComponent], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  alertMessage: string = '';
  alertType: 'success' | 'error' | 'warning' | 'info' = 'success';

  constructor(private authService: AuthService, private router: Router) {} // 🔥 Inyectar Router

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.showAlertMessage('Todos los campos son obligatorios ❌', 'error');
      return;
    }
  
    const userData = {
      first_name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };
  
    this.authService.register(userData).subscribe({
      next: () => {
        this.showAlertMessage('Registro exitoso 🎉', 'success');

        // 🔥 Esperar 3 segundos antes de redirigir al login
        setTimeout(() => {
          console.log('🔄 Redirigiendo a /login...');
          
          this.router.navigate(['/login']);
        }, 1000);

        this.resetForm(form);
      },
      error: () => {
        this.showAlertMessage('Error en el registro. Inténtalo de nuevo ❌', 'error');
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
}
