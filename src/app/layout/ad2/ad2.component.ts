import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-ad2',
  imports: [ TranslatePipe],
  templateUrl: './ad2.component.html',
  styleUrl: './ad2.component.css'
})
export class Ad2Component {

   constructor (private translate: TranslateService) {}
    useLanguage(language: string): void {
      this.translate.use(language);
  }
  

}
