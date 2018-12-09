import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RequestsService} from '../../../services/requests.service';
import {AddressZipResponce} from '../../../domain/address-zip-responce';


@Component({
  selector: 'app-search-for-incidents',
  templateUrl: 'search-for-incidents.component.html'
})

export class SearchForIncidentsComponent implements OnInit {
  errorMessage: string;
  public loading = false;
  public currentPage: number;
  private step = 10;
  private start = 0;
  public results: AddressZipResponce[];
  public viewResults: AddressZipResponce[];

  searchForm: FormGroup;

  formDefinition = {
    zipCode: [''],
    address: ['']
  };

  constructor(
    private fb: FormBuilder,
    private requestService: RequestsService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group(this.formDefinition);
  }

  submitRequest() {
    this.errorMessage = '';
    if (this.searchForm.valid) {
      this.loading = true;
      this.requestService.getRequestsByZipcodeAndStreet(
        this.searchForm.get('address').value, this.searchForm.get('zipCode').value).subscribe(
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

  getViewList(): AddressZipResponce[] {
    this.currentPage = Math.floor(this.start / this.step ) + 1;
    return this.viewResults = this.results.slice(this.start, this.start + this.step);
  }

  first() {
    this.start = 0;
  }

  previous() {
    if (this.start > 0) {
      this.start = this.start - this.step;
    }
  }

  next() {
    if (this.results.length > this.start + this.step ) {
      this.start = this.start + this.step;
    }
  }

  last() {
    this.start = (Math.floor(this.results.length / this.step ) - 1) * this.step;
  }

}
