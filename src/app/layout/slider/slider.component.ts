import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CablesComponent } from '../cables/cables.component';

// Import UIkit (make sure it's installed: npm install uikit)
import UIkit from 'uikit';
import { ViewChild } from '@angular/core';

interface Mapa {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, TranslatePipe, CablesComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit, AfterViewInit {

  @ViewChild('promoVideo') promoVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('promoVideo2') promoVideo2Ref!: ElementRef<HTMLVideoElement>;

  // Properties for the zoom modal
  zoomImageSrc: string = '';
  zoomImageAlt: string = '';

  // Your map images data (you can move this to a service later if needed)
  mapas: Mapa[] = [
    { src: 'img/mapas/mapasite-GLOBAL.png', alt: 'Global Network' },
    { src: 'img/mapas/mapa-site-MONET.png',   alt: 'MONET' },
    { src: 'img/mapas/mapa-site-SACS.png',     alt: 'SACS' },
    { src: 'img/mapas/mapa-site-WACS.png',     alt: 'WACS' },
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    // You can initialize other things here if needed
  }

  ngAfterViewInit(): void {
    const video = this.promoVideoRef?.nativeElement;
    const video2 = this.promoVideo2Ref?.nativeElement;

    [video, video2].forEach(v => {
      if (v) {
        v.muted = true;
        v.playsInline = true;
        v.autoplay = true;
        v.loop = true;
        v.play().catch(err => console.warn('Autoplay failed:', err));
      }
    });
  }

  /**
   * Opens the zoom modal with the selected image
   * @param src Image source URL
   * @param alt Alt text for accessibility
   */
  openZoomModal(src: string, alt: string): void {
    this.zoomImageSrc = src;
    this.zoomImageAlt = alt;

    // Open UIkit modal
    try {
      UIkit.modal('#zoom-modal').show();
    } catch (err) {
      console.error('Failed to open zoom modal:', err);
    }
  }

  /**
   * Optional: Close the zoom modal programmatically
   */
  closeZoomModal(): void {
    try {
      UIkit.modal('#zoom-modal').hide();
    } catch (err) {
      console.warn('Failed to close zoom modal:', err);
    }
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
