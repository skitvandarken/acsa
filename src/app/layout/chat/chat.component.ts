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
  const dfMessenger = document.querySelector('df-messenger') as HTMLDfmessengerElement;

  if (dfMessenger) {
    dfMessenger.addEventListener('df-messenger-loaded', () => {
      const payload = [
        {
          type: "list",
          title: "Bem-vindo à Angola Cables!",
          subtitle: "Estamos aqui para ajudar...",
          value: "Olá! ", // This will be returned
        }
      ];

      const returnedValue = dfMessenger.renderCustomCard(payload);
      console.log("Returned value:", returnedValue); // "Olá! "
    });
  } else {
    console.error('df-messenger element not found in the DOM.');
  }
}
}
interface CustomCard {
  type: string;
  title: string;
  subtitle: string;
  value: string; // This is what will be returned
}

declare global {
  interface HTMLDfmessengerElement extends HTMLElement {
    renderCustomCard: (payload: CustomCard[]) => string;
  }
}