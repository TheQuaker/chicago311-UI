import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeRoutingModule} from './home-routing.module';
import {SearchForIncidentsComponent} from './search/search-for-incidents.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ZipCodeTopRequestComponent} from './functions/zipCode-top-request.component';


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
    ZipCodeTopRequestComponent
  ]
})

export class HomeModule {}
