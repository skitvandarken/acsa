import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit, AfterViewInit {

  @ViewChild('promoVideo') promoVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('promoVideo2') promoVideo2Ref!: ElementRef<HTMLVideoElement>;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const video = this.promoVideoRef.nativeElement;
    const video2 = this.promoVideo2Ref.nativeElement;

    [video, video2].forEach(v => {
      v.muted = true;
      v.playsInline = true;
      v.autoplay = true;
      v.loop = true;
      v.play().catch(err => console.warn('Autoplay failed:', err));
    });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }


  
}
