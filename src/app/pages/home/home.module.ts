import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeRoutingModule} from './home-routing.module';
import {SearchForIncidentsComponent} from './search/search-for-incidents.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RequestPerTypeComponent} from './functions/request-per-type.component';
import {RequestsPerDayComponent} from './functions/requests-per-day.component';
import {ZipCodeTopRequestComponent} from './functions/zipCode-top-request.component';
import {NewIncidentComponent} from './newIncident/new-incident.component';
import {UserActionsComponent} from './user/user-actions.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ],
  declarations: [
    DashboardComponent,
    SearchForIncidentsComponent,
    RequestPerTypeComponent,
    RequestsPerDayComponent,
    ZipCodeTopRequestComponent,
    NewIncidentComponent,
    UserActionsComponent
  ]
})

export class HomeModule {}
