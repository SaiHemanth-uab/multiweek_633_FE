import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(public http: HttpClient, private router: Router) {}
  onSendFileToBucket(payload: any) {
    return this.http.post(`${environment.baseURL}/upload`, payload);
  }
  onSendSubscriptions(payload: Array<any>) {
    return this.http.post(`${environment.baseURL}/send/subscriptions`, payload);
  }
  onCheckUpdateClick(payload: any) {
    return this.http.post(`${environment.baseURL}/countClicks`, payload);
  }
}
