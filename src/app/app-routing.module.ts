import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'ticket/:id', component: TicketDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
