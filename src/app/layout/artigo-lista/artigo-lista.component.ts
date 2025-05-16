import { Component, inject } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AsyncPipe, DatePipe, NgFor } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RodapeComponent } from '../rodape/rodape.component';
import { MenuComponent } from '../menu/menu.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { Timestamp } from '@angular/fire/firestore'; // or from 'firebase/firestore'



@Component({
  selector: 'app-artigo-lista',
  standalone: true,  // Ensure standalone is true if using Angular 17+
  imports: [AsyncPipe, DatePipe, NgFor, TranslatePipe, RodapeComponent, TruncatePipe, MenuComponent ],
  templateUrl: './artigo-lista.component.html',
  styleUrl: './artigo-lista.component.css'
})
export class ArtigoListaComponent {
  private blogService = inject(BlogService);
  posts$ = this.blogService.getPosts(); // Fetch all posts


  convertTimestamp(timestamp: any): Date {
  if (timestamp?.toDate) {
    return timestamp.toDate(); // Firestore Timestamp has a toDate() method
  }
  return new Date(timestamp); // fallback
}
       constructor (private translate: TranslateService) {}
        useLanguage(language: string): void {
          this.translate.use(language);
      }
      }
      
  
