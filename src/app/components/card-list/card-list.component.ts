import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { LoadDataService, Server } from '../../services/load-data-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [NgFor, CardComponent, FormsModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {

  private serverService = inject(LoadDataService)
  servers: Server [] = [];
  filteredServes : Server [] = [];

  labelFilter: string = '';
  statusFilter: string = 'all';

  ngOnInit(): void {
    this.serverService.loadServers().subscribe(data => {
      this.servers = data;
    });
    this.filteredServes = [...this.servers];
    this.serverService.saveServers(this.servers);
  }


  onServerUpdate(index: number, updatedData: { label: string, active: boolean }) {
    this.servers[index] = updatedData;
    this.serverService.saveServers(this.servers);
    this.applyFilters(); 
  }

  applyFilters() {
    this.filteredServes = this.servers.filter(server => {
      const matchesLabel = server.label.toLowerCase().includes(this.labelFilter.toLowerCase());
      const matchesActive = 
        this.statusFilter === 'all' || 
        (this.statusFilter === 'active' && server.active) || 
        (this.statusFilter === 'inactive' && !server.active);
      
      return matchesLabel && matchesActive;
    });
  }

  updateLabelFilter(value: string) {
    this.labelFilter = value;
    this.applyFilters();
  }

  updateStatusFilter(value: string) {
    this.statusFilter = value;
    this.applyFilters();
  }

  addNewServer() {
    const newServer = { label: `Server ${this.servers.length + 1}`, active: false };
    this.servers.push(newServer);
    this.serverService.saveServers(this.servers);
    this.applyFilters();
  }
}
