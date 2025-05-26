import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {TranslateService } from '@ngx-translate/core';
import {  TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-angolacables',
  imports: [CommonModule, TranslatePipe, RouterLink],
  templateUrl: './angolacables.component.html',
  styleUrl: './angolacables.component.css'
})
export class AngolacablesComponent {

  useLanguage(language: string): void {
    this.translate.use(language);
}

constructor(private translate: TranslateService) {}

}
