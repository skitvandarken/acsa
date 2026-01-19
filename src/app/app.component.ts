import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { CookiesComponent } from "./layout/cookies/cookies.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, CookiesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true, 
})
export class AppComponent {
  title = 'part';
  

  

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['pt','en']);
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');


  
}
    
  
}
