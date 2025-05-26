import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { SignupComponent } from './paginas/signup/signup.component';
import { CriarcontaComponent } from './paginas/criarconta/criarconta.component';
import { IndicadorComponent } from './paginas/indicador/indicador.component';
import { AgenteComponent } from './paginas/agente/agente.component';
import { RevendedorComponent } from './paginas/revendedor/revendedor.component';
import { DatacenterComponent } from './paginas/datacenter/datacenter.component';
import { Angonap2Component } from './paginas/angonap2/angonap2.component';
import { AcercaComponent } from './paginas/acerca/acerca.component';
import { EventosComponent } from './layout/eventos/eventos.component';
import { EventosAcComponent } from './paginas/eventos-ac/eventos-ac.component';
import { BlogComponent } from './paginas/blog/blog.component';
import { ArtigoComponent } from './templates/artigo/artigo.component';
import { ServicosComponent } from './paginas/servicos/servicos.component';
import { ConectividadeComponent } from './paginas/conectividade/conectividade.component';
import { CloudservicesComponent } from './paginas/cloudservices/cloudservices.component';
import { DatacentersevicesComponent } from './paginas/datacentersevices/datacentersevices.component';
import { SegurancaComponent } from './paginas/seguranca/seguranca.component';
import { NoticiasComponent } from './paginas/noticias/noticias.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { RecrutamentoComponent } from './paginas/recrutamento/recrutamento.component';
import { VirtualizacaoComponent } from './paginas/virtualizacao/virtualizacao.component';
import { ErpComponent } from './paginas/erp/erp.component';
import { TrustCenterComponent } from './paginas/trust-center/trust-center.component';
import { IptransitComponent } from './dummy/artigos/iptransit/iptransit.component';
import { CibersecComponent } from './dummy/artigos/cibersec/cibersec.component';
import { Cloud2MontagemComponent } from './dummy/artigos/cloud2-montagem/cloud2-montagem.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { VagasCriarComponent } from './layout/vagas-criar/vagas-criar.component';


export const routes: Routes = [
  
    {path:'',component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'acerca', component: AcercaComponent},

    {path: 'conta', component: SignupComponent},
    {path: 'criar', component: CriarcontaComponent},
    {path: 'indicador', component:IndicadorComponent},
    {path: 'agente', component: AgenteComponent},
    {path: 'revendedor', component: RevendedorComponent},
    {path: 'datacenter', component: DatacenterComponent},
    {path: 'angonap2', component: Angonap2Component},
    {path:'eventos', component: EventosAcComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'artigo', component: ArtigoComponent},
    {path: 'servicos', component: ServicosComponent},
    {path: 'conectividade', component: ConectividadeComponent},
    {path: 'cloud', component: CloudservicesComponent},
    {path: 'data-center', component: DatacentersevicesComponent},
    {path: 'seguranca', component: SegurancaComponent},
    {path: 'noticias', component: NoticiasComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'recrutamento', component: RecrutamentoComponent},
    {path: 'datacenter', component: DatacentersevicesComponent},
    {path: 'virtualizacao', component: VirtualizacaoComponent},
    {path: 'erp', component: ErpComponent},
    {path: 'trust-center', component: TrustCenterComponent},

    {path: 'artigos/ip-transit-chave', component: IptransitComponent},
    {path: 'artigos/ciberseguranca', component: CibersecComponent},
    {path: 'artigos/cloud2-como-montar', component:Cloud2MontagemComponent},

        {path: 'dashboard', component:DashboardComponent},



    
  { 
    path: 'artigos', 
    loadComponent: () => import('./layout/artigo-lista/artigo-lista.component').then(m => m.ArtigoListaComponent) 
  },
  { 
    path: 'artigo/:id', 
    loadComponent: () => import('./layout/artigo/artigo.component').then(m => m.ArtigoComponent) 
  },
  
    { 
    path: 'postar', 
    loadComponent: () => import('./layout/artigo-postar/artigo-postar.component').then(m => m.ArtigoPostarComponent) 
  },
  
      { 
    path: 'postar-vaga', 
    loadComponent: () => import('./layout/vagas-criar/vagas-criar.component').then(m => m.VagasCriarComponent) 
  },


  

];
