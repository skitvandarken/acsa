import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-chat',
  imports: [],
  template: `
    <df-messenger
  intent="WELCOME"
  chat-title="Assistente Inteligente"
        chat-icon="https:&#x2F;&#x2F;marketing.host2africa.com&#x2F;drive&#x2F;chatbot-acsa.png"
  agent-id="b1462cc0-c02b-42d5-a538-3bf3a766792e"
  language-code="pt"
></df-messenger>
  `,
  styleUrl: './chat.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ChatComponent {



}
