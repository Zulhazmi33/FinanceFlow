import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  
  email:string = '';

  constructor(private auth: AuthService ) {}

  forgotPassword() {
    this.auth.forgotPassword(this.email);
    this.email = '';
  }
}
