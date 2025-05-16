import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AsyncPipe, CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RodapeComponent } from '../rodape/rodape.component';
import { MenuComponent } from '../menu/menu.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-artigo-lista',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    DatePipe,
    NgFor,
    NgIf,
    TranslatePipe,
    RodapeComponent,
    TruncatePipe,
    MenuComponent,
    RouterLink
  ],
  templateUrl: './artigo-lista.component.html',
  styleUrl: './artigo-lista.component.css'
})
export class ArtigoListaComponent implements OnInit {

  
  safeContent: SafeHtml = '';
  private blogService = inject(BlogService);
  posts$ = this.blogService.getPosts();

  constructor(
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) {}

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
