import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RequestsService} from '../../../services/requests.service';
import {StoredFunction2} from '../../../domain/stored-function-2';
import {Type} from '../../../domain/type';

@Component({
  selector: 'app-sf2',
  templateUrl: 'requests-per-day.component.html'
})

export class RequestsPerDayComponent implements OnInit {
  requestForm: FormGroup;
  public errorMessage: string;
  public types: Type[];
  public results: StoredFunction2[];
  public viewResults: StoredFunction2[];
  public loading = false;
  public currentPage: number;
  private step = 10;
  private start = 0;

  formDefinition = {
    requestType: ['', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required]
  };

  constructor(
    private fb: FormBuilder,
    private requestService: RequestsService
  ) {}

  ngOnInit(): void {
    this.getTypes();
    this.requestForm = this.fb.group(this.formDefinition);
  }

  submitRequest() {
    if (this.requestForm.valid) {
      this.loading = true;
      this.requestService.getDayRequests(
        this.requestForm.get('requestType').value,
        this.requestForm.get('startTime').value,
        this.requestForm.get('endTime').value).subscribe(
        res => {
          this.results = res;
          this.loading = false;
        },
        error => {
          this.errorMessage = <any>error;
          this.loading = false;
          console.log(error);
        },
      );
    }
  }

  getTypes() {
    this.requestService.getTypeOfRequests().subscribe(
      res => this.types = res,
      error => this.errorMessage = <any>error,
      () => {}
    );
  }

  /** For pagination **/
  getViewList(): StoredFunction2[] {
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
