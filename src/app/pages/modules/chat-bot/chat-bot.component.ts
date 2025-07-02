import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ChatBotService } from '../../../services/chatbot.service';


@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent {
  isChatOpen = false;
  messages: Message[] = [];
  currentMessage = '';
  isTyping = false;

  constructor(
    private chatBotService: ChatBotService, // Assuming you have a ChatBotService to handle API calls
  ) {

  }



  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (!this.currentMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: this.generateId(),
      content: this.currentMessage,
      role: 'user',
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    this.currentMessage = '';
    // Simulate bot typing
    this.isTyping = true;

    this.chatBotService.get_messagechatbot({ messages: userMessage.content }).subscribe(
      (response) => {
        const botMessage: Message = {
          id: this.generateId(),
          content: response.response,
          role: 'assistant',
          timestamp: new Date()
        };

        this.messages.push(botMessage);
        this.isTyping = false;
      },
      (error) => {
        const botMessage: Message = {
          id: this.generateId(),
          content: "Error en nuestros servicios. Por favor intenté mas tarde.",
          role: 'assistant',
          timestamp: new Date()
        };

        this.messages.push(botMessage);
        this.isTyping = false;
      });
    // Simulate bot response after 1-2 seconds

  }


  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
interface Message {
  id: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  content: string;
}
