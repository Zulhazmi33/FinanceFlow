import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      if (res.user?.emailVerified == true) {
        localStorage.setItem('userId', res.user.uid); 
        localStorage.setItem('userName', res.user.displayName || ''); // Store UID
        window.location.href = '/home';
      } else {
        alert('Your email has not been verified');
      }
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    });
  }
  // sign in with Google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(res => {
      const user = res.user;
      
      if (user) {
        localStorage.setItem('userId', user.uid); // Store UID
        localStorage.setItem('userName', user.displayName || ''); // Store Name
  
        // Redirect user to home page
        window.location.href = '/home';
      }
    }, err => {
      alert(err.message);
    });
  }
  


  // register method
  register(email: string, password: string, displayName: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      if (res.user) {
        res.user.updateProfile({ displayName: displayName }).then(() => {
          alert('A link has been sent to your registered email. Please verify it.');
          this.emailVerification(res.user);
        }).catch(err => {
          alert('Failed to update profile: ' + err.message);
        });
      }
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }
  // email verification
  emailVerification(user: any) {
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/login']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send mail to your email.');
    });
  }
  //forgot password
  forgotPassword(email:string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      alert('Your new password has been sent to your email');
    }, err => {
      alert('Something went wrong');
    })
  }
  // logout method
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      window.location.href = '/home';
    }, err => {
      alert(err.message);
    });
  }
}
