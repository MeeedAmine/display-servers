import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import * as jsonData from '../../assets/data.json';

export interface Server {
  label: string;
  active: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  jsonData: any = (jsonData as any).default;

  loadServers(): Observable<Server[]> {

    const savedServers = localStorage.getItem('servers');

    return savedServers ? of(JSON.parse(savedServers)) : of(jsonData).pipe(
      map(data => this.extractServers(data))
    );
  }

  private extractServers(data: any): Server[] {
    const servers: Server[] = [];
    
    function findServers(obj: any) {
      if (obj && typeof obj === 'object') {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (key === 'server') {
              servers.push(obj[key]);
            } else {
              findServers(obj[key]);
            }
          }
        }
      }
    }

    findServers(data);
    return servers;
  }

  saveServers(servers: Server[]) {
    localStorage.setItem('servers', JSON.stringify(servers));
  }
}
