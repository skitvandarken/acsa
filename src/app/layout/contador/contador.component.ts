import { Component, Input, OnInit, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contador',
  imports: [],
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent implements OnInit, AfterViewInit, OnDestroy { // <--- Added OnInit

  @Input() startValue: number = 0;
  @Input() targetValue: number = 10;
  @Input() interval: number = 1000;

  count: number = 0;
  intervalId: any;
  observer: IntersectionObserver | null = null;

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // <--- NEW ngOnInit method
  ngOnInit() {
    // Initialize count here, before the view is checked
    this.count = this.startValue;
  }

  ngAfterViewInit() {
    // Ensure this line is GONE from here: this.count = this.startValue;

    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.startCounting();
        } else {
          this.stopCounting();
        }
      }, { threshold: 0.5 });

      this.observer.observe(this.elementRef.nativeElement);
    }
  }

  startCounting() {
    if (!this.intervalId && this.count < this.targetValue) {
      this.intervalId = setInterval(() => {
        if (this.count < this.targetValue) {
          this.count++;
        } else {
          this.stopCounting();
        }
      }, this.interval);
    }
  }

  stopCounting() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngOnDestroy() {
    this.stopCounting();
    if (isPlatformBrowser(this.platformId)) {
      this.observer?.disconnect();
    }
  }
}