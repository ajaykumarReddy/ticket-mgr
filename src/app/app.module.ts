import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {TooltipModule} from 'primeng/tooltip';
import {MessageService} from 'primeng/api';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketDetailsComponent,
    TicketListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    DropdownModule,
    ToastModule,
    TooltipModule,
    ButtonModule,
    InputTextModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
