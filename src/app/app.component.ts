import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingsComponent } from './shared/global-components/loadings/loadings.component';
import { ChatBotComponent } from './pages/modules/chat-bot/chat-bot.component';
import { AlertsToastComponent } from "./shared/global-components/toast/alerts-toast/alerts-toast.component";





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, LoadingsComponent, ChatBotComponent, AlertsToastComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'mis-pueblitos-frontend';

  posts = [
    {
      id: 1,
      title: 'Primera entrada del blog',
      summary: 'Un resumen de lo que trata este post.',
      content: 'Contenido completo del post...',
      author: 'Wanly',
      date: '2024-09-01',
      imageUrl: 'https://source.unsplash.com/800x400/?nature'
    },
    // Más entradas...
  ];
}
