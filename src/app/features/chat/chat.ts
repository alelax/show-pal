import { Component } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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
  </div>`,
  styleUrl: './chat.scss',
  imports: [MatFormField, MatLabel, MatInput, MatFabButton, MatIcon],
})
export default class Chat {
  sendMessage(inputField: string) {
    console.log('sendMessage', inputField);
  }
}
