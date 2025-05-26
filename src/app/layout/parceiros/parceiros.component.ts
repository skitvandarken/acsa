import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Don't forget this import!
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-parceiros',
  imports: [TranslatePipe],
    templateUrl: './parceiros.component.html',
  styleUrl: './parceiros.component.css'
})
export class ParceirosComponent implements AfterViewInit {

  // Inject PLATFORM_ID into the constructor
  constructor(private translate: TranslateService, @Inject(PLATFORM_ID) private platformId: Object) {}

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngAfterViewInit(): void {
    // Only run this code if the application is running in a browser
    if (isPlatformBrowser(this.platformId)) {
      const sliderInner = document.querySelector('.slider-inner') as HTMLElement;

      // Clone all images and append them for seamless loop
      if (sliderInner) {
        sliderInner.innerHTML += sliderInner.innerHTML;
      }
    }
  }
}