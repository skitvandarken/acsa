import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, CommonModule, TranslateModule,],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  private preloadFlags() {
    ['ao', 'usa', 'fr'].forEach(flag => {
      new Image().src = `/img/bandeiras/${flag}.png`;
    });
  }

  constructor(
    private router: Router,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.preloadFlags();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    this.updateLanguageDisplay(language);
  }

  onLanguageChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.useLanguage(selectedValue);
  }

  selectedFlag: string = 'img/bandeiras/ao.png'; // Default flag for PT
  selectedLanguage: string = 'PT'; // Default language text
  private updateLanguageDisplay(language: string): void {
    if (language === 'pt') {
        this.selectedFlag = 'img/bandeiras/ao.png';
        this.selectedLanguage = 'PT';
    } else if (language === 'en') {
        this.selectedFlag = 'img/bandeiras/usa.png';
        this.selectedLanguage = 'EN';
    } else if (language === 'fr') {
        this.selectedFlag = 'img/bandeiras/fr.png';
        this.selectedLanguage = 'FR';
    }
    this.cdr.detectChanges();
  }
}