import {Component, OnInit} from '@angular/core';
import {Type} from '../../../domain/type';
import {UserActivity} from '../../../domain/user-activity';
import {RequestsService} from '../../../services/requests.service';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html'
})

export class UserActionsComponent implements OnInit {

  public errorMessage: string;
  public types: Type[];
  public results: UserActivity[];
  public viewResults: UserActivity[];
  public loading = false;
  public currentPage: number;
  private step = 10;
  private start = 0;

  constructor (private requestService: RequestsService) {}

  ngOnInit(): void {
    this.getUserActivities();
  }

  getUserActivities() {
    this.loading = true;
    this.requestService.getUserActivities().subscribe(
      res => {
        this.results = res;
        this.loading = false;
      },
      error => {
        this.errorMessage = <any>error;
        this.loading = false;
      },
    );
  }

  /** For pagination **/
  getViewList(): UserActivity[] {
    this.currentPage = Math.floor(this.start / this.step ) + 1;
    return this.viewResults = this.results.slice(this.start, this.start + this.step);
  }

  first() {
    this.start = 0;
  }

  next() {
    if (this.results.length > this.start + this.step ) {
      this.start = this.start + this.step;
    }
  }

  previous() {
    if (this.start > 0) {
      this.start = this.start - this.step;
    }
  }

  last() {
    this.start = Math.floor(this.results.length / this.step ) * this.step;
  }

}
