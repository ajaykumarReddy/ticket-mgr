import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  cols: any[];
  loading: boolean;
  ticket_list: any[];
  agents: any[];
  agentName: any;
  priority: any;
  status: any;
  statusVals: { label: string; value: string; }[];
  priorties: any[];
  color_codes: any;
  agentsTable: { label: string; value: string; }[];
  constructor(private httpService: HttpService, private toastService: MessageService) { }

  ngOnInit() {
    this.color_codes = { N: '#FFFF00', Q: '#0000FF', R: '#FF6600', S: '#660000', W: '#009900', D: '#99FFCC', C: '#FF0000' };
    this.agents = [
      {label:'Select Agent', value:null},
      { label: 'All', value: 'all' },
      { label: 'Ashok', value: 'blr01' },
      { label: 'Chandu', value: 'blr02' },
      { label: 'Dev', value: 'blr03' },
      { label: 'Sneha', value: 'blr04' },
      { label: 'Marthanda', value: 'blr05' },
      { label: 'Not Assigned', value: 'none' },
    ];

    this.agentsTable = [
      {label:'Select Agent', value:null},
      { label: 'Ashok', value: 'blr01' },
      { label: 'Chandu', value: 'blr02' },
      { label: 'Dev', value: 'blr03' },
      { label: 'Sneha', value: 'blr04' },
      { label: 'Marthanda', value: 'blr05' },
    ];

    this.agentName = this.agents[0];

    this.statusVals = [
      {label:'Select Status', value:null},
      { label: 'New', value: 'N' },
    { label: 'Quote Sent', value: 'Q' },
    { label: 'Reply From Customer', value: 'R' },
    { label: 'Sale', value: 'S' },
    { label: 'Waiting For Info', value: 'W' },
    { label: 'Duplicate', value: 'D' },
    { label: 'Closed', value: 'C' }];
    this.status = this.statusVals[0];
    this.priorties = [{ name: 'All', value: 'A' }, { name: 'Low', value: 'L' }, { name: 'Medium', value: 'M' },
    { name: 'High', value: 'H' }, { name: 'Urgent', value: 'U' }];

    this.priority = this.priorties[0];
    this.getTicketData('all');

  }

  selectAgent(event) {
    console.log('select agent.....', this.agentName, this.status, this.priority);
    this.getTicketData(this.agentName.value, this.status.value, this.priority.value);
  }

  getTicketData(agent, status?, priority?) {
    this.loading = true;
    this.httpService.getTicketsList(agent, status, priority).subscribe((data: any) => {
      console.log('tickets data....', data);
      this.ticket_list = data.ticket_list;
      this.loading = false;
    }, err => {
      this.loading = false;
      this.toastService.add({severity:'error', summary: 'Error Message', detail:'failed to load data'});
    });
  }

  agentChange(event, row, agentName, status, index) {
    console.log('agent changed.... ', agentName, row, name, index);
    row.agent_name = agentName.label;
    row.agent = agentName.value;
    const payload = {
      agent: row.agent,
      id: row.code,
      status: status
    };
    this.httpService.saveData(payload).subscribe(res => {
      if (this.agentName.label !== 'ALL') {
        this.ticket_list.splice(index, 1);
      }
      this.toastService.add({ severity: 'success', summary: 'Success', detail: 'Ticke details updated' });
    }, err=> {
      this.toastService.add({severity:'error', summary: 'Error Message', detail:'updation failed'});
    });
  }

  statusChange(event, row, agentName, status, index) {
    row.status_text = status.label;
    row.status = status.value;
    const payload = {
      agent: agentName,
      id: row.code,
      status: row.status
    };
    this.httpService.saveData(payload).subscribe(res => {
      this.toastService.add({ severity: 'success', summary: 'Success', detail: 'Ticke details updated' });
    }, err=> {
      this.toastService.add({severity:'error', summary: 'Error Message', detail:'updation failed'});
    });
  }

}
