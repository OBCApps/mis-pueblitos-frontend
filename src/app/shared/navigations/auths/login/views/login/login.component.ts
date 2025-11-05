import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Constants } from '../../../../../global-components/Constants';
import { Router } from '@angular/router';
import { AuthService } from '../../../auths.service';
import { BaseServices } from '../../../../../global-components/BaseServices';
import { AuthorizationService } from '../../../../../global-components/authorization/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private baseServices: BaseServices,
    private authorizationService: AuthorizationService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials = this.loginForm.value;
      console.log('Login data:', credentials);

      /* // Aquí irá tu llamada al backend
      setTimeout(() => {
        this.isLoading = false;
        // Manejar respuesta del backend
      }, 2000); */
      this.authService.login_service(credentials).subscribe(
        response => {
          this.isLoading = false;

          if (this.baseServices.checkTransactionMessages(response)) {

            //this.baseServices.showMessageSucces('Registrado correctamente.');
            this.authorizationService.setUserSesion(JSON.stringify(response.data));
            this.router.navigate([Constants.HOME])
          }

        }, err => {
          console.log("err", err);

          this.isLoading = false;
          this.baseServices.showMessageError(err.error.message);
        }
      );

    }
  }

  getEmailError(): string {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'El email es requerido';
    }
    if (emailControl?.hasError('email')) {
      return 'Ingresa un email válido';
    }
    return '';
  }

  getPasswordError(): string {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'La contraseña es requerida';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }

  goToRegister() {
    this.router.navigate([Constants.REGISTER_USERCONSUMER])
  }
}