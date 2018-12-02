import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SearchForIncidentsComponent} from './search/search-for-incidents.component';
import {ZipCodeTopRequestComponent} from './functions/zipCode-top-request.component';
import {AuthGuard} from '../../services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: '', redirectTo: 'home/dashboard', pathMatch: 'full'},
      {path: 'home/dashboard', component: DashboardComponent},
      {path: 'home/searchForIncidents', component: SearchForIncidentsComponent},
      {path: 'home/storedFunction/zipCodeTopRequests', component: ZipCodeTopRequestComponent}
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class HomeRoutingModule {}
