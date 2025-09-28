import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-llm-agent-container',
  standalone: true,
  imports: [FormsModule, CardModule, ButtonModule, TextareaModule, ScrollPanelModule],
  templateUrl: './llm-agent-container.component.html',
  styleUrl: './llm-agent-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LlmAgentContainerComponent {
  messages: { text: string; isUser: boolean }[] = [
    { text: 'Hello! I\'m your AI real estate assistant. How can I help you today?', isUser: false }
  ];
  userInput = '';

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, isUser: true });
      this.userInput = '';
      // Simulate AI response
      setTimeout(() => {
        this.messages.push({
          text: 'I\'m analyzing the property data to provide insights...',
          isUser: false
        });
      }, 1000);
    }
  }
}
