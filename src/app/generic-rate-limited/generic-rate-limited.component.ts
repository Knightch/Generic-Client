import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Generic } from '../models/generic';
import { RequestServiceService } from '../services/request-service.service';

@Component({
  selector: 'app-generic-rate-limited',
  templateUrl: './generic-rate-limited.component.html',
  styleUrls: ['./generic-rate-limited.component.css']
})
export class GenericRateLimitedComponent implements OnDestroy{

  private requestSubscription!: Subscription;
  responseArray: any[] = [];

  jsonObject!: Generic

  deleteId = 'exampleId';

  apiUrl = 'http://localhost:8080/generic/ratelimited';

  constructor(private requestService: RequestServiceService){}

  startRequests() {
    this.requestSubscription = this.requestService.makeContinuousRequests(this.jsonObject, this.deleteId, this.apiUrl).subscribe(
      response => {
        this.responseArray.push(response);
      },
      error => {
        console.error('Error making request:', error);
      }
    );
  }

  stopRequests() {
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }
  }

}
