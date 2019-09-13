import { Component, OnInit,TemplateRef } from '@angular/core';
import { PortalService } from 'src/app/services/portal.service';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialog } from '@angular/material';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  length = 5;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  modalRef:BsModalRef;
  fileUploadData:any;
  displayedColumns = ['fileNumber', 'totalRecords', 'processedRecords', 'pendingRecords', 'status', 'submissionTime','completionTime','inputFile','processedFile'];
  constructor(public service:PortalService,private dialog: MatDialog,   private modalService: BsModalService,
     public dialogRef: MatDialogRef<FileUploadComponent>
    ) { }

  ngOnInit() {
    this.getFileUploadData();
  }
getFileUploadData(){
  this.service.getAllFileUploadData().subscribe(data=>{
    this.fileUploadData=data;
    console.log("this.subscriptionsList"+this.fileUploadData);
  })
}
btnclickedBrowse() {
  let element: HTMLElement = document.getElementById(
    "browsefile"
  ) as HTMLElement;
  element.click();
}
Cancel() {
   this.dialogRef.close();
}

newUploads(openUpload:TemplateRef<any>){
  this.modalRef = this.modalService.show(openUpload, { class: 'modal-md' });
}
}
