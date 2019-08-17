import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { MessageService } from 'primeng/api';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  enuiryCode: string;
  ticket: any;
  isEdit: boolean;
  submitted: boolean;
  duration;
  vehicleTypes;
  accomidationTypes;
  constructor(private route: ActivatedRoute, private httpService: HttpService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log('params.....', params.get('ticketCode'));
      this.enuiryCode = params.get('ticketCode');
      this.httpService.getTicketDetails(params.get('ticketCode')).subscribe(res => {
        console.log('res ticket details...', res);
        this.ticket = res;
      });
    });
    this.duration = [
      { label: '1 Day', value: '1' },
      { label: '2 Days & 1 Night', value: '2' },
      { label: '3 Days & 2 Nights', value: '3' },
      { label: '4 Days & 3 Nights', value: '4' },
      { label: '5 Days & 4 Nights', value: '5' },
      { label: '6 Days & 5 Nights', value: '6' },
      { label: '7 Days & 6 Nights', value: '7' },
      { label: '8 Days & 7 Nights', value: '8' }
    ];

    this.vehicleTypes = [
      { label: 'Standard Vehicle', value: 'Standard' },
      { label: 'Hatchback (4 Pax)', value: 'Hatchback' },
      { label: 'Sedan (4 Pax)', value: 'Sedan' },
      { label: 'SUV (7 Pax)', value: 'SUV' },
      { label: 'Tempo', value: 'Tempo (12-15 Pax)' },
      { label: 'Coach-20Pax', value: 'Small Coach (20 Pax)' },
    ];

    this.accomidationTypes = [
      { label: 'budget', value: 'Budget Accommodation' },
      { label: '2star', value: '2-star Accommodation' },
      { label: '3star', value: '3-Star Accommodation' },
      { label: '4star', value: '4-Star Accommodation' },
      { label: '5start', value: '5-Star &amp; Above' }
    ];
  }


  gotoTicketList() {
    this.router.navigate(['/ticketList']);
  }

  saveTicketDetails(ticketData) {
    ticketData.id = ticketData.code;
    ticketData.budget = ticketData.budget ? ticketData.budget : '';
    const startDate = ticketData.start_date;
    const [year, month, day] = ticketData.start_date.split('-');
    ticketData.start_date = `${day}/${month}/${year}`;
    this.httpService.updateTicket(ticketData).subscribe((res: any) => {
      this.isEdit = false;
      ticketData.start_date = startDate;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.status });
    }, err => {
      this.isEdit = false;
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'updation failed' });
    })
  }

}
