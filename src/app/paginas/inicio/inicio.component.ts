import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MenuComponent } from '../../layout/menu/menu.component';
import { AngolacablesComponent } from '../../layout/angolacables/angolacables.component';
import { ServicosComponent } from '../../layout/servicos/servicos.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { SliderComponent } from '../../layout/slider/slider.component';
import { ParceirosComponent } from '../../layout/parceiros/parceiros.component';
import { BlogComponent } from '../../layout/blog/blog.component';
import { NumerosComponent } from '../../layout/numeros/numeros.component';
import { EventosComponent } from '../../layout/eventos/eventos.component';
import { TelcablesComponent } from "../../layout/telcables/telcables.component";
import { AdComponent } from "../../layout/ad/ad.component";
import { CaracteristicasComponent } from '../../layout/caracteristicas/caracteristicas.component';
import { Ad2Component } from "../../layout/ad2/ad2.component";
import { CertificacoesComponent } from '../../layout/certificacoes/certificacoes.component';
import { TestmenuComponent } from '../../testmenu/testmenu.component';
import { ChatComponent } from '../../layout/chat/chat.component';

@Component({
  selector: 'app-inicio',
  imports: [MenuComponent, TestmenuComponent, ChatComponent, NumerosComponent, CertificacoesComponent, ServicosComponent, EventosComponent, NumerosComponent, AdComponent, CaracteristicasComponent, BlogComponent, Ad2Component, AngolacablesComponent, ServicosComponent, RodapeComponent, SliderComponent, ParceirosComponent, TelcablesComponent, AdComponent ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {

  

  constructor(private auth: AuthService, private router: Router) {

  }

 ngOnInit(): void {

  const videoElement = document.getElementById('promoVideo') as HTMLVideoElement;
    if (videoElement) {
      videoElement.muted = true; // Forçar o vídeo a ser mudo
    }
   
  this.auth.isAuthenticated$.subscribe(isAutheticated => {
    if (isAutheticated) {
      this.router.navigate(['/painel']);
      console.log('Usuário Autenticado');
    } else {
      console.log('Usuário Não Autenticado');
    }
  })
 }

  login(){
    this.auth.loginWithRedirect();

  }

}
