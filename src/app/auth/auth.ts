// auth.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

@Component({
  selector: 'app-auth',
  imports: [CommonModule,  ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class Auth implements OnInit {
  authForm: FormGroup;
  isSignUp = false;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  errorMessage = '';
  successMessage = '';

  constructor(private formBuilder: FormBuilder) {
    this.authForm = this.createForm();
  }

  ngOnInit(): void {
    // Initialize component
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    });
  }

  toggleAuthMode(): void {
    this.isSignUp = !this.isSignUp;
    this.clearMessages();
    this.authForm.reset();

    if (this.isSignUp) {
      this.authForm.get('confirmPassword')?.setValidators([
        Validators.required,
        this.passwordMatchValidator.bind(this)
      ]);
    } else {
      // Remove confirm password validation for sign in
      this.authForm.get('confirmPassword')?.clearValidators();
    }

    this.authForm.get('confirmPassword')?.updateValueAndValidity();
  }

  passwordMatchValidator(control: any): { [key: string]: boolean } | null {
    const password = this.authForm?.get('password')?.value;
    const confirmPassword = control.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.clearMessages();

    const formData: AuthFormData = {
      email: this.authForm.get('email')?.value,
      password: this.authForm.get('password')?.value
    };

    if (this.isSignUp) {
      formData.confirmPassword = this.authForm.get('confirmPassword')?.value;
      this.signUp(formData);
    } else {
      this.signIn(formData);
    }
  }

  signIn(data: AuthFormData): void {
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;

      // Mock validation - replace with actual authentication service
      if (data.email === 'test@example.com' && data.password === 'password123') {
        this.successMessage = 'Successfully signed in!';
        console.log('Sign in successful:', data);
        // Redirect to dashboard or home page
      } else {
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    }, 2000);
  }

  signUp(data: AuthFormData): void {
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;

      // Mock validation - replace with actual authentication service
      const existingEmails = ['admin@example.com', 'user@example.com'];

      if (existingEmails.includes(data.email)) {
        this.errorMessage = 'An account with this email already exists.';
      } else {
        this.successMessage = 'Account created successfully! You can now sign in.';
        console.log('Sign up successful:', data);

        // Automatically switch to sign in after successful registration
        setTimeout(() => {
          this.isSignUp = false;
          this.authForm.reset();
          this.clearMessages();
        }, 2000);
      }
    }, 2000);
  }

  markFormGroupTouched(): void {
    Object.keys(this.authForm.controls).forEach(key => {
      const control = this.authForm.get(key);
      control?.markAsTouched();
    });
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  getFieldError(fieldName: string): string {
    const field = this.authForm.get(fieldName);

    if (field?.touched && field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }

      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }

      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `Password must be at least ${requiredLength} characters long`;
      }

      if (field.errors['passwordMismatch']) {
        return 'Passwords do not match';
      }
    }

    return '';
  }

  getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      'email': 'Email',
      'password': 'Password',
      'confirmPassword': 'Confirm Password'
    };

    return displayNames[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.authForm.get(fieldName);
    return !!(field?.touched && field?.errors);
  }

  // Social login methods (placeholder for future implementation)
  signInWithGoogle(): void {
    console.log('Google sign in clicked');
    // Implement Google OAuth
  }

  signInWithFacebook(): void {
    console.log('Facebook sign in clicked');
    // Implement Facebook OAuth
  }

  onForgotPassword(): void {
    console.log('Forgot password clicked');
    // Implement forgot password functionality
  }
}