import { Component, OnInit,ViewChild } from '@angular/core';
import { PortalService } from 'src/app/services/portal.service';
import { MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {SubscriptionRequestPage} from 'src/app/components/Modal/subscriptionRequestPage';
@Component({
  selector: 'app-subscription-request',
  templateUrl: './subscription-request.component.html',
  styleUrls: ['./subscription-request.component.scss']
})
export class SubscriptionRequestComponent implements OnInit {
  subscriptionRequestDetails: any;
  subscriptionRequestList:any;
  SubscriptionRequestPage:SubscriptionRequestPage;
  pageSize:number;
  pageNumber:number;
  pageIndex:number;
  subscription:Subscription;
  subscriptionRequestListData:any;
  pageSizeOptions: number[] = [2,5, 10, 25, 100];
  totalElements:number;
  name:any;
  subscriptionRequestDetailsColumns = ['Request#', 'Input_Data', 'Request_At', 'Response', 'Received_At', 'Status', 'Confirmation#'];
  @ViewChild('MatPaginator', { static: false }) paginator: MatPaginator;
  constructor(public service: PortalService,private route: ActivatedRoute) {
    this.SubscriptionRequestPage=new SubscriptionRequestPage();
    this.pageNumber = 0;
    this.pageSize = 5;
  //  this.pageIndex = 0;
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params['name'];
    })
    this.subscription = this.service.getsubscriptionRequestMessage().subscribe(message => {
      this.subscriptionRequestList = message;
          if (message != null || message != undefined) {
        this.subscriptionRequestList = this.subscriptionRequestList.content;
        //this.totalElements= this.subscriptionRequestList.totalElements;
        console.log("request"+JSON.stringify(this.subscriptionRequestList))
           }
    }
    );
  
 this.getAllSubscriptionRequestDetailsData(this.name,this.pageIndex,this.pageSize);

  }
  getAllSubscriptionRequestDetailsData(name,pageIndex,pageSize) {
    this.service.getAllSubscriptionRequestDetails(this.name,this.pageIndex,this.pageSize).subscribe(data => {
      this.subscriptionRequestDetails = data;
      this.subscriptionRequestListData=data['content']
      this.totalElements= this.subscriptionRequestDetails.totalElements;
         })
  }
  page(event) {
    // alert("page")
     this.pageIndex = event.pageIndex;
     this.pageSize = event.pageSize;
     alert("this.pageSize"+this.pageSize);
     alert("this.pageIndex"+this.pageIndex)
 this.getAllSubscriptionRequestDetailsData(this.name,this.pageIndex,this.pageSize);

  }
}