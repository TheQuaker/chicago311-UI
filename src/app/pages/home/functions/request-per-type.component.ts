import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RequestsService} from '../../../services/requests.service';
import {StoredFunction1} from '../../../domain/stored-function-1';


@Component({
  selector: 'app-sf1',
  templateUrl: 'request-per-type.component.html'
})

export class RequestPerTypeComponent implements OnInit {
  requestForm: FormGroup;
  public results: StoredFunction1[];
  public loading = false;

  formDefinition = {
    fromDate: ['', Validators.required],
    toDate: ['', Validators.required]
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
      this.requestService.getTypeTotalRequests(
        this.formatDate(this.requestForm.get('fromDate').value),
        this.formatDate(this.requestForm.get('toDate').value)).subscribe(
        res => {
          this.results = res;
          this.loading = false;
        },
        error => console.log(error),
        // () =>
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
}
