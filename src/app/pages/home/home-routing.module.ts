import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home.component';
import {SearchForIncidentsComponent} from './search/search-for-incidents.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: '', redirectTo: 'home/dashboard', pathMatch: 'full'},
      {path: 'home/dashboard', component: DashboardComponent},
      {path: 'home/searchForIncidents', component: SearchForIncidentsComponent}
    ]
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
