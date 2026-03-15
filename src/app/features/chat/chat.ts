import { Component, effect, inject } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { chatResource, createTool } from '@hashbrownai/angular';
import { MatCard, MatCardContent } from '@angular/material/card';
import { firstValueFrom } from 'rxjs';
import { ShowsLoaderService } from '../../core/shows-loader.service';

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
                  <p>{{ message.content }}</p>
                </mat-card-content>
              </mat-card>
            </div>
          }
        }
      }
    </div>
  </div>`,
  styleUrl: './chat.scss',
  imports: [MatFormField, MatLabel, MatInput, MatFabButton, MatIcon, MatCard, MatCardContent],
})
export default class Chat {
  #showsLoaderService = inject(ShowsLoaderService);

  chat = chatResource({
    model: 'gpt-4o',
    debugName: 'chat',
    system: 'You are a friendly chat bot',
    tools: [
      createTool({
        name: 'getShows',
        description: 'A tool to list available TV Shows. Call this tool whenever the user asks for shows',
        handler: async () => firstValueFrom(this.#showsLoaderService.loadAll()),
      }),
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
