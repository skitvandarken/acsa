import { Component, inject } from '@angular/core';
import { ArtigoPostarComponent } from '../../layout/artigo-postar/artigo-postar.component';
import { MenuComponent } from '../../layout/menu/menu.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ArtigoListaComponent } from '../../layout/artigo-lista/artigo-lista.component';
import { VagasCriarComponent } from '../../layout/vagas-criar/vagas-criar.component';
import { VagasListarComponent } from '../../layout/vagas-listar/vagas-listar.component';
import { NoticiasListarComponent } from '../../layout/noticias-listar/noticias-listar.component';
import { NoticiasPostarComponent } from '../../layout/noticias-postar/noticias-postar.component';
import { EventosListarComponent } from '../../layout/eventos-listar/eventos-listar.component';
import { EventosPostarComponent } from '../../layout/eventos-postar/eventos-postar.component';
import { PaineisPostarComponent } from '../../layout/paineis-postar/paineis-postar.component';
import { PaineisListarComponent } from '../../layout/paineis-listar/paineis-listar.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { ProdutoCriarComponent } from '../../layout/produto-criar/produto-criar.component';
import { LayoutItemsComponent } from "../../layout/layout-items/layout-items.component";
import { ProductListComponent } from '../../layout/product-list/product-list.component';

import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-dashboard',
  imports: [
    ArtigoPostarComponent,
    MenuComponent,
    ArtigoListaComponent,
    VagasCriarComponent,
    VagasListarComponent,
    TranslatePipe,
    NoticiasListarComponent,
    NoticiasPostarComponent,
    EventosListarComponent,
    EventosPostarComponent,
    PaineisPostarComponent,
    PaineisListarComponent,
    RodapeComponent,
    ProdutoCriarComponent,
    LayoutItemsComponent, 
    ProductListComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  // ✅ DECLARA COMO PÚBLICO (removendo a palavra 'private')
  // Desta forma, o template HTML pode aceder às propriedades e métodos do AuthService
  public authService = inject(AuthService);

  // Método opcional caso prefiras acionar o logout por uma função do componente
  async onLogout(): Promise<void> {
    await this.authService.logout();
  }
           useLanguage(language: string): void {
                this.translate.use(language);
            }
            
            constructor(private translate: TranslateService) {}
            selectedCountry: string = 'Angola';

            activeTab: string = 'products'; // Set default active tab

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  isTabActive(tab: string): boolean {
    return this.activeTab === tab;
  }

}
