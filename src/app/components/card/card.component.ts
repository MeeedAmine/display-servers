import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Server } from '../../services/load-data-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() isActive: boolean = false;
  @Input() label: string = 'Server';
  @Output() update = new EventEmitter<Server>();


  onLabelChange(newLabel: string) {
    this.label = newLabel;
    this.emitUpdate();
  }

  toggleStatus() {
    this.isActive = !this.isActive;
    this.emitUpdate();
  }

  private emitUpdate() {
    this.update.emit({ label: this.label, active: this.isActive });
  }
}
