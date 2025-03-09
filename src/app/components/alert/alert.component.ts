import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <div *ngIf="showAlert" 
         class="fixed top-5 right-5 z-50 transition-transform duration-500 ease-in-out transform w-80"
         [ngClass]="{
           'translate-x-0 opacity-100': !animateOut, 
           'translate-x-[150%] opacity-0': animateOut
         }">
      <!-- Encabezado de la alerta -->
      <div class="font-bold rounded-t px-4 py-2"
           [ngClass]="bgColor">
        {{ title }}
      </div>
      <!-- Cuerpo de la alerta -->
      <div class="border border-t-0 rounded-b px-4 py-3"
           [ngClass]="bodyColor">
        <p>{{ message }}</p>
      </div>
    </div>
  `
})
export class AlertComponent implements OnInit, OnChanges {
  @Input() message: string = ''; 
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'success'; 

  showAlert: boolean = true;
  animateOut: boolean = false;

  bgColor: string = '';
  bodyColor: string = '';

  ngOnInit() {
    this.updateClasses(); // 🔥 Asegurar que los estilos sean correctos desde el inicio
    setTimeout(() => {
      this.animateOut = true;
      setTimeout(() => (this.showAlert = false), 500);
    }, 3000);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type']) {
      setTimeout(() => {
        this.updateClasses();
      });
    }
  }

  get title(): string {
    switch (this.type) {
      case 'error': return 'Error';
      case 'warning': return 'Advertencia';
      case 'success': return 'Éxito';
      case 'info': return 'Información';
      default: return 'Alerta';
    }
  }

  updateClasses() {
    this.bgColor = this.getBgColor();
    this.bodyColor = this.getBodyColor();
  }

  getTitle(): string {
    switch (this.type) {
      case 'error': return 'Error';
      case 'warning': return 'Advertencia';
      case 'success': return 'Éxito';
      case 'info': return 'Información';
      default: return 'Alerta';
    }
  }

  getBgColor(): string {
    switch (this.type) {
      case 'error': return 'bg-red-500 text-white';
      case 'warning': return 'bg-yellow-500 text-black';
      case 'success': return 'bg-green-500 text-white';
      case 'info': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  }

  getBodyColor(): string {
    switch (this.type) {
      case 'error': return 'border-red-400 bg-red-100 text-red-700';
      case 'warning': return 'border-yellow-400 bg-yellow-100 text-yellow-700';
      case 'success': return 'border-green-400 bg-green-100 text-green-700';
      case 'info': return 'border-blue-400 bg-blue-100 text-blue-700';
      default: return 'border-gray-400 bg-gray-100 text-gray-700';
    }
  }
}
