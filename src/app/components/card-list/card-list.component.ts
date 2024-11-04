import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { LoadDataService, Server } from '../../services/load-data-service.service';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [NgFor, CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {

  private serverService = inject(LoadDataService)
  servers: Server [] = [];

  ngOnInit(): void {
    this.serverService.loadServers().subscribe(data => {
      this.servers = data;
      console.log(this.servers);
    });
  }

  toggleStatus(server: any) {
    server.isActive = !server.isActive;
  }
}
