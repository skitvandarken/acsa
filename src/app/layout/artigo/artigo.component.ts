import { Component, inject } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';


@Component({
  selector: 'app-artigo',
  imports: [RouterLink, DatePipe, TruncatePipe],
  templateUrl: './artigo.component.html',
  styleUrl: './artigo.component.css'
})
export class ArtigoComponent {

    blogService = inject(BlogService);
  posts = this.blogService.posts;
  

}