import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ad',
  imports: [ TranslatePipe],
  templateUrl: './ad.component.html',
  styleUrl: './ad.component.css'
})
export class AdComponent {
  
     constructor (private translate: TranslateService) {}
      useLanguage(language: string): void {
        this.translate.use(language);
    }

}
