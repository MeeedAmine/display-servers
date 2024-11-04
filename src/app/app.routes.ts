import { Routes } from '@angular/router';
import { CardListComponent } from './components/card-list/card-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/servers', pathMatch: 'full' },
    { path: 'servers', component: CardListComponent },
];
