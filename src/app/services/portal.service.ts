import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';
import {SubscriptionRequestPage} from 'src/app/components/Modal/subscriptionRequestPage'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  public messageSource = new BehaviorSubject<any>(undefined);
  public subscriptionMessageSource = new BehaviorSubject<any>(undefined);
  public subscriptionRequestMessageSource = new BehaviorSubject<any>(undefined);
  public sampleData: string = "/assets/data/sampleData.json";
  public subscriptionData: string = "/assets/data/subscription.json";
  public subscriptionDetailsData: string = "/assets/data/subscriptionDetails.json";
  public subscriptionRequestDetails: string = "/assets/data/subscriptionRequestDetails.json";
  public fileUploadData: string = "/assets/data/fileUploadData.json";
  public APIEndpoint : string = environment.APIEndpoint;


  constructor(private http: HttpClient) { }

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json');
  }

  get(url: string) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, httpOptions).pipe(map((res: Response) => res));
  }

  getSampleData(pageNumber: number, pageSize: number) {
    //return this.http.get(this.sampleData).pipe(map((user: any) => user));
    return this.get(
      this.APIEndpoint + 'links?page=' + pageNumber + '&size=' + pageSize);
  }
  getAllSubscriptions(linkId: number, pageNumber1: number, pageSize1: number) {
    //return this.http.get(this.subscriptionData).pipe(map((user: any) => user));
    return this.get(
      this.APIEndpoint + 'link/' + linkId + '/subscriptions?page' + pageNumber1 + '&size' + pageSize1
    );
  }
  getAllSubscriptionDetails(linkId, subscriptionId, pageNumber, pageSize) {
    // return this.http.get(this.subscriptionDetailsData).pipe(map((user: any) => user));  
    return this.get(
      this.APIEndpoint + 'link/' + linkId + '/subscription/' + subscriptionId + '/details?page=' + pageNumber + '&size=' + pageSize
    );
  }
  getAllSubscriptionRequestDetails(subscriptionName:string, pageIndex:number , pageSize:number) {
    //return this.get(this.APIEndpoint);
    //return this.http.get(this.subscriptionRequestDetails).pipe(map((user: any) => user)); 
    return this.get(
      this.APIEndpoint + 'subscription/' + subscriptionName + '/requests?page=' + pageIndex + '&size=' + pageSize
    );
  }
  getAllFileUploadData() {
    return this.http.get(this.fileUploadData).pipe(map((user: any) => user));
  }
  public sendNewMessage(message: any) {
    this.messageSource.next(message);
  }
  public sendNewSubscriptionRequestMessage(subscriptionMessage: any) {
    this.subscriptionRequestMessageSource.next(subscriptionMessage);
  }
  public sendNewSubscriptionMessage(subscriptionMessage: any) {
    this.subscriptionMessageSource.next(subscriptionMessage);
  }
  getmessage(): Observable<any> {
    return this.messageSource.asObservable();
  }

  getsubscriptionRequestMessage(): Observable<any> {
    return this.subscriptionRequestMessageSource.asObservable();
  }
  getsubscriptionMessage(){
    return this.subscriptionMessageSource.asObservable();
  }
}
