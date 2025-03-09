import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  constructor() {
    console.log('✅ ChatComponent cargado correctamente.');
  }
}
