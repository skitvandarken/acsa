
import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Noticia } from '../models/noticias.models';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService{
  private firestore = inject(Firestore);
  private noticiasCollection = collection(this.firestore, 'noticias');
  
  noticias = signal<Noticia[]>([]);

  constructor() {
    console.log('NoticiasService initializado');
    this.getNoticias().subscribe(noticias => {
      console.log('Noticias carregadas', noticias);
      this.noticias.set(noticias);
    });
  }

getNoticias(): Observable<Noticia[]> {
  console.log('Fetching all noticias');
  return collectionData(this.noticiasCollection, { idField: 'id' }).pipe(
    map((noticias: any[]) => noticias
      .map(noticia => noticia as Noticia)
      .sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
        return dateB - dateA; // most recent first
      })
    ),
    tap(noticias => console.log('Sorted noticias:', noticias))
  ) as Observable<Noticia[]>;
}

  getPostById(id: string): Observable<Noticia | undefined> {
    console.log('Fetching noticia with ID:', id);
    const postDoc = doc(this.firestore, `vagas/${id}`);
    return docData(postDoc, { idField: 'id' }).pipe(
      map(noticia => {
        if (!noticia) {
          throw new Error('Noticia não encontrada');
        }
        return noticia as Noticia;
      }),
      tap(noticia => console.log('Retrieved noticia:', noticia))
    ) as Observable<Noticia>;
  }
}