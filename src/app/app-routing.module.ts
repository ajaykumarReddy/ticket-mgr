import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';


const routes: Routes = [
  { path: '',   redirectTo: '/ticketList', pathMatch: 'full' },
  { path: 'ticket/:ticketCode', component: TicketDetailsComponent },
  { path: 'ticketList', component: TicketListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
