import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() isActive: boolean = false;
  @Input() label: string = 'Server';
  @Output() toggleStatus = new EventEmitter<void>();
  
  isLabelValid: boolean = true;

  onLabelChange(newLabel: string) {
    this.label = newLabel;
    this.isLabelValid = this.label.length >= 5;
  }

  emitToggle() {
    this.toggleStatus.emit();
  }
}
