import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, CommonModule, TranslateModule,],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  selectedFlag: string = 'img/bandeiras/ao.png'; // Default flag for PT
  selectedLanguage: string = 'PT'; // Default language text

  constructor(
    public auth: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/painel']);
        console.log('Usuário Autenticado');
      } else {
        console.log('Usuário Não Autenticado');
      }
    });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    this.updateLanguageDisplay(language);
  }

  onLanguageChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.useLanguage(selectedValue);
  }

  private updateLanguageDisplay(language: string): void {
    if (language === 'pt') {
      this.selectedFlag = 'img/bandeiras/ao.png';
      this.selectedLanguage = 'PT';
    } else if (language === 'en') {
      this.selectedFlag = 'img/bandeiras/usa.png';
      this.selectedLanguage = 'EN';
    }
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout();
  }
}