import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RequestsService} from '../../../services/requests.service';
import {StoredFunction3} from '../../../domain/stored-function-3';


@Component({
  selector: 'app-sf3',
  templateUrl: 'zipCode-top-request.component.html'
})

export class ZipCodeTopRequestComponent implements OnInit {
  requestForm: FormGroup;

  public results: StoredFunction3[];
  public viewResults: StoredFunction3[];
  public loading = false;
  public currentPage: number;
  private step = 10;
  private start = 0;

  formDefinition = {
    date: ['', Validators.required]
  };

  constructor(
    private fb: FormBuilder,
    private requestService: RequestsService
  ) {
  }

  ngOnInit(): void {
    this.requestForm = this.fb.group(this.formDefinition);
  }

  submitRequest() {
    if (this.requestForm.valid) {
      this.loading = true;
      this.requestService.getZipTopRequests(this.formatDate(this.requestForm.get('date').value)).subscribe(
        res => {
          this.results = res;
          this.loading = false;
          },
        error => console.log(error)
      );
    }
  }

  formatDate(input: string) {
    const datePart = input.match(/\d+/g),
      year = datePart[0],
      month = datePart[1],
      day = datePart[2];

    return day + '-' + month + '-' + year;
  }

  getViewList(): StoredFunction3[] {
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
