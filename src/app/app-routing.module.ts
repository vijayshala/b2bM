import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { PortalComponent} from 'src/app/components/portal/portal.component';
import { SubscriptionDetailsComponent} from 'src/app/components/subscription-details/subscription-details.component';
import {SubscriptionRequestComponent} from 'src/app/components/subscription-request/subscription-request.component';
import { from } from 'rxjs';
var redirectPath: string = "portalDashboard";
const routes: Routes = [ 
  { path: '', redirectTo:redirectPath, pathMatch: 'full' },
  {
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: 'portalDashboard',component:PortalComponent, 
       children: [
        // { path: 'subscriptionDetails', redirectTo: 'subscriptionDetails/:id/:name', pathMatch: 'full' },
        {
          path: 'subscriptionDetails/:id/:name',component:SubscriptionDetailsComponent, pathMatch: 'full'
        },
        {
          path: 'subscriptionRequests/:name',component:SubscriptionRequestComponent, pathMatch: 'full'
        }
      ]
    }
  ]
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
