import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concatMap, forkJoin, interval, of, switchMap, tap, throwError } from 'rxjs';
import { Generic } from '../models/generic';
import { RequestCounts } from '../models/requestCount';
import { ResponseCounts } from '../models/responsCount';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {



  constructor(private http: HttpClient) { }

  generateRandomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  generateRandomGenericObject(): Generic {
    const genericObject = new Generic();
    genericObject.id = Math.floor(Math.random() * 1000);
    genericObject.field1 = this.generateRandomString(10);
    genericObject.field2 = this.generateRandomString(10);
    genericObject.field3 = this.generateRandomString(10);
    genericObject.field4 = this.generateRandomString(10);
    genericObject.field5 = this.generateRandomString(10);
    genericObject.field6 = this.generateRandomString(10);
    genericObject.field7 = this.generateRandomString(10);
    genericObject.field8 = this.generateRandomString(10);
    genericObject.field9 = this.generateRandomString(10);
    genericObject.field10 = this.generateRandomString(10);
    return genericObject;
  }

  makeContinuousRequests(jsonObject: Generic, id: string, apiUrl: string): Observable<any[]> {
    let requestCounts: RequestCounts = {
      get: 0,
      put: 0,
      post: 0,
      delete: 0
    };
    let responseCounts: ResponseCounts = {
      get: 0,
      put: 0,
      post: 0,
      delete: 0
    };

    const generateRequest = (method: string, url: string, body?: any) => {
      return this.http.request(method, url, { body }).pipe(
        tap(() => responseCounts[method]++),
        catchError(error => {
          console.error(`Error in ${method.toUpperCase()} request:`, error);
          return of(null);
        })
      );
    };

    return interval(0).pipe(
      concatMap(() => {
        const startTime = performance.now(); // Start time for the interval
        const randomObject = this.generateRandomGenericObject();

        const requests = [
          generateRequest('get', apiUrl),
          generateRequest('put', apiUrl + '/update', randomObject),
          generateRequest('post', apiUrl + '/post', randomObject),
          generateRequest('delete', apiUrl + '/delete', { id })
        ];

        return forkJoin(requests).pipe(
          tap((responses) => {
            console.log('Received responses:', responses);
            const endTime = performance.now(); // End time for the interval
            const elapsedTime = endTime - startTime; // Calculate elapsed time
            console.log(`Time taken for interval: ${elapsedTime} ms`);
          })
        );
      }),
      tap((responses) => {
        requestCounts['get']++;
        requestCounts['put']++;
        requestCounts['post']++;
        requestCounts['delete']++;

        console.log(`Requests made - GET: ${requestCounts['get']}, PUT: ${requestCounts['put']}, POST: ${requestCounts['post']}, DELETE: ${requestCounts['delete']}`);
        console.log(`Responses received - GET: ${responseCounts['get']}, PUT: ${responseCounts['put']}, POST: ${responseCounts['post']}, DELETE: ${responseCounts['delete']}`);
      })
    );
  }
}
