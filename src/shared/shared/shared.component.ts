import { Component, OnInit, Input, Inject } from '@angular/core';
import{ Router } from '@angular/router'
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {


  @Input() show: boolean;
  @Input() message: string;
  @Input() header: string;

  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit() {

  }



  //close popup 
  closePopup() {
    this.show = false;
    //this.document.location.href = 'csqt/pochase/';
    // window.location.href = 'http://www.cnn.com/';
     location.reload();
    //this.router.navigateByUrl('https://login-stg.avaya.com/sso/common/login.jsp')
  }

}
