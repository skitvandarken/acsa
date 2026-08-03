// src/app/services/auth.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { 
  Auth, 
  user, 
  signInWithEmailAndPassword, 
  signOut, 
  User,
  GoogleAuthProvider,
  signInWithPopup
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router = inject(Router);

  // Observable que escuta o estado da sessão em tempo real
  user$: Observable<User | null> = user(this.auth);

  // Signal para acesso síncrono rápido na UI
  currentUser = signal<User | null>(null);


  constructor() {
    this.user$.subscribe(currentUser => {
      this.currentUser.set(currentUser);
    });
  }

  /** Login com Email e Password */
  async loginWithEmail(email: string, pass: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, pass);
    this.router.navigate(['/dashboard']); // Redireciona após login
  }

  /** Login com Google */
  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
    this.router.navigate(['/dashboard']);
  }

  /** Terminar Sessão */
  async logout(): Promise<void> {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}