import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-certificacoes',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './certificacoes.component.html',
  styleUrl: './certificacoes.component.css'
})
export class CertificacoesComponent {
    
      constructor (private translate: TranslateService) {}
      useLanguage(language: string): void {
        this.translate.use(language);
    }
  

}
