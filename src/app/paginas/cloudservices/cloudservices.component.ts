import { Component, inject } from '@angular/core';
import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';

import { TranslateService, TranslatePipe } from '@ngx-translate/core'; // Inserido

@Component({
  selector: 'app-cloudservices',
  imports: [
   
    MenuComponent,
    RodapeComponent,
  
    TranslatePipe // Inserido
  ],
  templateUrl: './cloudservices.component.html',
  styleUrl: './cloudservices.component.css'
})
export class CloudservicesComponent {

      useLanguage(language: string): void {
            this.translate.use(language);
        }
        
        constructor(private translate: TranslateService) {}

        languages = [
          { code: 'pt', name: 'PT', flag: 'assets/flags/pt-flag.svg' },
          { code: 'en', name: 'EN', flag: 'assets/flags/us-flag.svg' },
          // Add more languages as needed
          { code: 'fr', name: 'FR', flag: 'assets/flags/fr-flag.svg' },
          { code: 'es', name: 'ES', flag: 'assets/flags/es-flag.svg' }
        ];
      
        selectedLanguage = this.languages[0]; // Default to first language
      
        onLanguageChange(event: Event) {
          const select = event.target as HTMLSelectElement;
          const langCode = select.value;
          const foundLang = this.languages.find(l => l.code === langCode);
          if (foundLang) {
            this.selectedLanguage = foundLang;
          }
        }
}