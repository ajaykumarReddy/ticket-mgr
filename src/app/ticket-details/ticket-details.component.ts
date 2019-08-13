import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  enuiryCode: string;
  ticket: any;
  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log('params.....', params.get('ticketCode'));
      this.enuiryCode = params.get('ticketCode');
      this.httpService.getTicketDetails(params.get('ticketCode')).subscribe(res => {
        console.log('res ticket details...', res);
        this.ticket = res;
      });
    });
  }

}
