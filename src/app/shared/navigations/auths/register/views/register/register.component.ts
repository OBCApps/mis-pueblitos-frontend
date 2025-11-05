import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseComponents } from '../../../../../global-components/BaseComponents';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../../auths.service';
import { BaseServices } from '../../../../../global-components/BaseServices';
import { Router } from '@angular/router';
import { Constants } from '../../../../../global-components/Constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class RegisterComponent {
  signupForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  errorMessage = '';
  step: number = 1;
  passwordStrength: number = 0;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private baseServices: BaseServices,
    private router: Router
  ) {


    this.signupForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido_paterno: ['', [Validators.required, Validators.minLength(2)]],
      apellido_materno: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  calculatePasswordStrength(): void {
    const password = this.signupForm.get('password')?.value || '';
    let strength = 0;

    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    this.passwordStrength = strength;
  }

  getPasswordStrengthColor(): string {
    if (this.passwordStrength <= 2) return 'bg-red-500';
    if (this.passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  }

  getPasswordStrengthText(): string {
    if (this.passwordStrength <= 2) return 'Débil';
    if (this.passwordStrength === 3) return 'Media';
    return 'Fuerte';
  }

  nextStep(): void {
    if (this.validateStep1()) {
      this.step = 2;
    }
  }

  validateStep1(): boolean {
    return this.signupForm.get('nombre')?.valid &&
      this.signupForm.get('apellido_paterno')?.valid &&
      this.signupForm.get('apellido_materno')?.valid;
  }

  previousStep(): void {
    this.step = 1;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const formData = this.signupForm.value;
      delete formData.confirmPassword;



      this.authService.register(formData).subscribe(
        response => {
          this.isLoading = false;

          if (this.baseServices.checkTransactionMessages(response)) {

            this.baseServices.showMessageSucces('Registrado correctamente.');
            this.router.navigate([Constants.LOGIN_USERCONSUMER])
          }

        }, err => {
          console.log("err", err);

          this.isLoading = false;
          this.baseServices.showMessageError(err.error.message);
        }
      );
    }
  }

  getFieldError(fieldName: string): string {
    const control = this.signupForm.get(fieldName);

    if (control?.hasError('required')) {
      return `${fieldName.replace(/_/g, ' ')} es requerido`;
    }
    if (control?.hasError('email')) {
      return 'Ingresa un email válido';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo ${control.getError('minlength').requiredLength} caracteres`;
    }
    if (control?.hasError('pattern')) {
      if (fieldName === 'celular') {
        return 'El celular debe tener 10 dígitos';
      }
    }
    return '';
  }
}
