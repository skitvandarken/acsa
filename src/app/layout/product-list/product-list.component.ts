import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Produto } from '../../models/products.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    RouterLink
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private translate = inject(TranslateService);

  produtos$ = this.productService.getProducts();

  // Controlos do fluxo de eliminação
  deletingId: string | number | null = null;
  selectedProductToDelete: Produto | null = null;

  constructor() {
    this.translate.setDefaultLang('pt');
    this.translate.use(this.translate.currentLang || 'pt');
  }

  /** Abre o modal de confirmação */
  confirmarEliminacao(produto: Produto): void {
    this.selectedProductToDelete = produto;
  }

  /** Fecha o modal sem apagar */
  cancelarEliminacao(): void {
    this.selectedProductToDelete = null;
  }

  /** Executa a remoção no Firestore */
  async executarEliminacao(): Promise<void> {
    if (!this.selectedProductToDelete) return;

    const targetProduct = this.selectedProductToDelete;
    this.deletingId = targetProduct.id;
    this.selectedProductToDelete = null; // Fecha o modal

    try {
      await this.productService.deleteProduct(targetProduct.id.toString());
    } catch (error) {
      console.error('Erro ao apagar o produto:', error);
      alert('Ocorreu um erro ao tentar apagar o produto.');
    } finally {
      this.deletingId = null;
    }
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}