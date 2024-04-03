import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestServiceService } from '../services/request-service.service';
import { Generic } from '../models/generic';

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.css']
})
export class GenericComponent implements OnDestroy{

  private requestSubscription!: Subscription;
  responseArray: any[] = [];

  jsonObject!: Generic

  deleteId = 'exampleId';

  apiUrl = 'https://local.eefa.io/generic';

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
