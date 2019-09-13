import { Component, OnInit, Input } from '@angular/core';
import { PortalService } from 'src/app/services/portal.service';
import { DataSource } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { SubscriptionDetails } from 'src/app/components/Modal/subscriptionDetails';
@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.scss']
})
export class SubscriptionDetailsComponent implements OnInit {
  subscriptionDetailsList: any;
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  subscription: Subscription;
  SubscriptionDetails: SubscriptionDetails;
  linkIdList: any;
  subscriptionsList: any;
  linkId: any;
  subscriptionId: any;
  subscriptionDetailsData: any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @Input() sendMessage;
  @Input() sendSubscriptionMessage;
  subscriptionDetailsColumns = ['subscriptionId', 'ratePlanName', 'chargeName', 'CHARGE_DISCOUNT_PERCENTAGE', 'TIER_PRICE'];
  constructor(public service: PortalService, public router: Router, private route: ActivatedRoute) {
    this.SubscriptionDetails = new SubscriptionDetails();
    this.pageNumber = 0;
    this.pageSize = 5;
  }

  ngOnInit() {
    this.subscription = this.service.getsubscriptionMessage().subscribe(message => {
      this.subscriptionDetailsList = message;
      if (message != null || message != undefined) {
        this.subscriptionDetailsData = this.subscriptionDetailsList.content;
        this.totalElements = this.subscriptionDetailsList.totalElements;
            }
    }
    );
  }
}