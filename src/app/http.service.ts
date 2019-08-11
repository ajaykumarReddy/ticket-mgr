import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    httpOptions: { headers: HttpHeaders; };
    constructor(private httpClient: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'auth_token': 'TokenForTrawellTesting2019'
            })
        };
    }

    getTicketsList(agent, status = 'N', priority = 'All') {
        const apiURL: string = `ticket-mgr/rest/admin/get-ticket-list?agent=${agent}&status=${status}&priority=${priority}`;
        return this.httpClient.get(apiURL, this.httpOptions);
    }

    saveData(payload) {
        const apiURL = `ticket-mgr/rest/admin/quick-ticket-update?id=IT16445227&status=Q&agent=blr03`;
        return this.httpClient.post(apiURL, payload, this.httpOptions);
    }
}