import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AsyncPipe, CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  imports: [
    AsyncPipe,
    CommonModule,
    DatePipe,
    NgIf,
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  safeContent: SafeHtml = '';
  private blogService = inject(BlogService);
  
  // Modified to sort posts by date in descending order
  posts$ = this.blogService.getPosts().pipe(
    map(posts => posts.sort((a, b) => {
      const dateA = a.createdAt?.toDate().getTime() || 0;
      const dateB = b.createdAt?.toDate().getTime() || 0;
      return dateB - dateA; // For descending order (newest first)
    }))
  );

  constructor(
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) { }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngOnInit() {
    this.posts$.subscribe(posts => {
      if (posts.length > 0) {
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(posts[0].content);
      }
    });
  }
}