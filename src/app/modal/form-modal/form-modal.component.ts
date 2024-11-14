import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent {
   @Input() isOpen = false;
   @Output() onClose = new EventEmitter<any>();

  closeModal(){
    this.onClose.emit();
  }
  // Escucha cambios en el historial del navegador
  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    this.onClose.emit("Me cierro");
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }
}
