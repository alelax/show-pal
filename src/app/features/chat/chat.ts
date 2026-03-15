import { Component, effect, inject } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { createTool, exposeComponent, RenderMessageComponent, uiChatResource } from '@hashbrownai/angular';
import { MatCard, MatCardContent } from '@angular/material/card';
import { firstValueFrom } from 'rxjs';
import { ShowsLoaderService } from '../../core/shows-loader.service';
import { Shows } from '../../pattern/shows/shows';
import { s } from '@hashbrownai/core';
import { LoadingIndicator } from '../../ui/loading-indicator/loading-indicator';
import { ThemeSwitch } from '../../ui/theme-switch/theme-switch';

@Component({
  selector: 'app-chat',
  template: ` <div class="chat-container">
    <div class="chat-input">
      <mat-form-field>
        <mat-label>How can I help you?</mat-label>
        <input #inputField matInput (keydown.enter)="sendMessage(inputField.value)" />
      </mat-form-field>

      <button
        matFab
        color="primary"
        class="send-button"
        aria-label="Send message"
        (click)="sendMessage(inputField.value)"
      >
        <mat-icon>send</mat-icon>
      </button>
    </div>

    <div class="chat-messages">

      @if (chat.isLoading()) {
        <app-loading-indicator/>
      }
      @for (message of chat.value(); track $index) {
        @switch (message.role) {
          @case ('user') {
            <mat-card class="message user">
              <mat-card-content>
                <p>{{ message.content }}</p>
              </mat-card-content>
            </mat-card>
          }
          @case ('assistant') {
            @if (message.content) {
              <div class="assistant-message-container">
                <div class="assistant-avatar">
                  <mat-icon
                    aria-hidden="false"
                    aria-label="Assistant avatar"
                    fontIcon="face_2"
                  ></mat-icon>
                </div>
                <mat-card class="message assistant">
                  <mat-card-content>
                    <hb-render-message [message]="message" />
                  </mat-card-content>
                </mat-card>
              </div>
            }
          }
        }
      }
    </div>
  </div>`,
  styleUrl: './chat.scss',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatFabButton,
    MatIcon,
    MatCard,
    MatCardContent,
    RenderMessageComponent,
    LoadingIndicator,
  ],
})
export default class Chat {
  #showsLoaderService = inject(ShowsLoaderService);

  chat = uiChatResource({
    model: 'gpt-4o',
    debugName: 'chat',
    system: 'You are a friendly chat bot',
    tools: [
      createTool({
        name: 'getShows',
        description:
          'A tool to list available TV Shows. Call this tool whenever the user asks for shows',
        handler: async () => firstValueFrom(this.#showsLoaderService.loadAll()),
      }),
    ],
    components: [
      exposeComponent(Shows, {
        description:
          'Render a component when the user asks to view one or more TV shows (e.g., "show X", "list shows", "details for show 123"). Never use for general questions.',
        input: {
          showIds: s.array('Array of show ids', s.string('Id of a show')),
        },
      }),
      exposeComponent(ThemeSwitch, {
        description: 'Show when user ask to switch app theme (e.g. "switch to dark", "toggle theme", ecc...)'
      })
    ],
  });

  #chatEffectRef = effect(() => {
    console.log(this.chat.value());
  });

  sendMessage(inputField: string) {
    this.chat.sendMessage({
      role: 'user',
      content: inputField.trim(),
    });
  }
}
