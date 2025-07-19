import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chat',
  imports: [
    CommonModule
  ],
  template: `
    <df-messenger
  intent="WELCOME"
  chat-title="Assistente Inteligente"
  chat-icon="https:&#x2F;&#x2F;marketing.host2africa.com&#x2F;drive&#x2F;chatbot-acsa.png"
  agent-id="b1462cc0-c02b-42d5-a538-3bf3a766792e"
  language-code="pt"
    input-placeholder="" 

></df-messenger>
  `,
  styleUrl: './chat.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ChatComponent implements AfterViewInit {

  // Opcional: Se precisar acessar o elemento df-messenger diretamente no TS
  // @ViewChild('dfMessengerElement') dfMessengerElement: ElementRef<HTMLDfmessengerElement>;

  ngAfterViewInit() {
    // Certifica-se de que o elemento df-messenger está disponível no DOM.
    // O ideal é que este código seja executado após o df-messenger ter sido totalmente inicializado.
    // Pode haver um pequeno atraso, então um setTimeout pode ajudar a garantir.

    const dfMessenger = document.querySelector('df-messenger') as any; // 'as any' para evitar erro de tipo temporariamente

    if (dfMessenger)  if (dfMessenger) {
    dfMessenger.addEventListener('df-messenger-loaded', () => {
      // Now render your card
      const payload = [
        {
          "type": "list",
          "title": "Bem-vindo à Angola Cables!",
          "subtitle": "Estamos aqui para ajudar...",
        }
      ];
      (dfMessenger as any).renderCustomCard(payload);
    });
  } else {
      console.error('df-messenger element not found in the DOM.');
    }
  }
}

// Interfaces TypeScript para ajudar com o autocompletar e tipagem
// Se quiser tornar o 'as any' mais específico
declare global {
  interface HTMLDfmessengerElement extends HTMLElement {
    renderCustomCard: (payload: any[]) => void;
  }

}
