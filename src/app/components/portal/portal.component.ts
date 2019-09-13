import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { from } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { CdkDetailRowDirective } from '../../../shared/directive/cdk-detail-row.directive';
import { PortalService } from 'src/app/services/portal.service';
import { MatPaginator } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { JsonPipe } from '@angular/common';
import { Page } from 'src/app/components/Modal/pageable';
import { SubscriptionPage } from 'src/app/components/Modal/subscriptionPage';
import { PageEvent } from '@angular/material/paginator';
import { PartnerLinkList } from 'src/app/components/Modal/partnerLinkList';
import {SubscriptionRequestPage} from 'src/app/components/Modal/subscriptionRequestPage';
@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PortalComponent implements OnInit {
  sampleData: any;
  //paginator:any;
  public isCollapsed = {};
  subscriptionsList: any;
  subscriptionDetailsList: any;
  subscriptionRequestList:any;
  Page: Page;
  SubscriptionPage: SubscriptionPage;
  pageNumber: number;
  pageSize: number;
  pageIndex: number;
  totalElements: number;
  linkIdList: any;
  linkId: number;
  subscriptionId: string;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSizeOptions1: number[] = [5, 10, 25, 100];
  pageNumber1: number;
  pageSize1: number;
  pageNumber2: number;
  pageSize2: number;
  pageNumber3:number;
  pageSize3 :number;
  pageIndex1: number;
  totalElements1: number;
  SubscriptionRequestPage:SubscriptionRequestPage;
  public partnerLinkListData: BehaviorSubject<PartnerLinkList[]> = new BehaviorSubject<PartnerLinkList[]>([]);
  @ViewChild('MatPaginator', { static: false }) paginator: MatPaginator;
  @Output() parentCallEvent = new EventEmitter<any>();
  pageEvent: PageEvent;
  displayedColumns = ['Link_Id', 'Century_File', 'Century_Timestamp', 'Magento_File', 'Magento_Timestamp', 'Status', 'Retry_Count', 'expandCollapse'];
  subdisplayedColumns = ['Name', 'Account#', 'Request', 'Requested_At', 'Response', 'Received_At', 'Status', 'Confirmation#', 'Workflow', 'expandcollapse'];

  @Input() singleChildRowDetail: boolean = true;
  private openedRow: CdkDetailRowDirective

  @Input() singleChildRowDetail1: boolean = true;
  private openedRow1: CdkDetailRowDirective

  onToggleChange(cdkDetailRow: CdkDetailRowDirective, row: Element): void {
    if (this.singleChildRowDetail && this.openedRow && this.openedRow.expended) {
      this.openedRow.toggle();
    }
    if (!row.close) {
      this.cellClicked(row);
      row.close = true;
    } else {
      row.close = false;
    }
    this.openedRow = cdkDetailRow.expended ? cdkDetailRow : undefined;
  }

  onToggle(cdkDetailRow: CdkDetailRowDirective, row: Element): void {
    if (this.singleChildRowDetail1 && this.openedRow1 && this.openedRow.expended) {
      this.openedRow1.toggle();
    }
    if (!row.close) {
      this.cellClicked(row);
      row.close = true;
    } else {
      row.close = false;
    }
    this.openedRow1 = cdkDetailRow.expended ? cdkDetailRow : undefined;
  }

  constructor(public service: PortalService, public router: Router,
    private dialog: MatDialog, private route: ActivatedRoute) {
    this.Page = new Page();
    this.SubscriptionRequestPage= new SubscriptionRequestPage();
    this.SubscriptionPage = new SubscriptionPage();
    this.pageNumber = 0;
    this.pageSize = 5;
    //  this.pageNumber1 = this.SubscriptionPage.pageNumber;
    //  this.pageSize1 =this.SubscriptionPage.pageSize;
    this.pageNumber1 = 0;
    this.pageSize1 = 5;
    this.pageNumber2 = 0;
    this.pageSize2 = 5;
    this.pageNumber3 = 0;
    this.pageSize3 = 5;
  }
  ngOnInit() {
    this.getData(this.pageSize, this.pageNumber);
  }
  getData(pageSize: number, pageNumber: number) {
    this.service.getSampleData(pageNumber, pageSize).subscribe(data => {
      this.linkIdList = data['content'];
      this.totalElements = data['totalElements'];
      if (data != null || data != undefined) {
        this.linkIdList.forEach(element => {
          this.linkId = element.file_id;
        });
      }
    })
  }
  getAllSubscriptionData(linkId, pageNumber1: number, pageSize1: number) {
     
    this.service.getAllSubscriptions(linkId, this.pageNumber1, this.pageSize1).subscribe(data => {
      this.subscriptionsList = data['content'];
      this.totalElements1 = data['totalElements'];
      if (data != null || data != undefined) {
        this.subscriptionsList.forEach(element => {
          this.subscriptionId = element.name;
        })
      }
    })
  }

  page(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.pageSize, this.pageIndex);
  }
  page1(event) {
    this.pageIndex1 = event.pageIndex1;
    this.pageSize1 = event.pageSize1;
    this.getAllSubscriptionData(this.linkId, this.pageSize1, this.pageIndex1);
  }
  fileUpload() {
    let dialogRef = this.dialog.open(FileUploadComponent, {
      height: '700px',
      width: '9800px',
    });
  }
  cellClicked(element) {
  }
  public sendMessage() {
    this.service.sendNewMessage(this.linkIdList);
  }

  getAllSubscriptionDetailsData(Id, subscriptionID, pageSize2, pageNumber2) {
     
    this.service.getAllSubscriptionDetails(Id, subscriptionID, this.pageNumber2, this.pageSize2).subscribe(data => {
      this.subscriptionDetailsList = data;
      this.service.sendNewSubscriptionMessage(this.subscriptionDetailsList);
    })
  }
 
  getAllSubscriptionRequestData(subscriptionName,pageSize3, pageNumber3) {
    this.service.getAllSubscriptionRequestDetails(subscriptionName, this.pageNumber3, this.pageSize3).subscribe(data => {
      this.subscriptionRequestList=data;
      this.service.sendNewSubscriptionRequestMessage(this.subscriptionRequestList);
    })
  }
}
export interface Element {
  close?: boolean;
}
