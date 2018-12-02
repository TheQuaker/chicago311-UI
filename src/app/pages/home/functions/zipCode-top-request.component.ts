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
  testResults;

  results: StoredFunction3[];

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
      this.requestService.getZipTopRequests(this.formatDate(this.requestForm.get('date').value)).subscribe(
        res => this.results = res,
        error => console.log(error)
      );
    }
  }

  print() {
    console.log(this.requestForm.value);
    console.log(this.formatDate(this.requestForm.get('date').value));
  }

  formatDate(input: string) {
    const datePart = input.match(/\d+/g),
      year = datePart[0],
      month = datePart[1], day = datePart[2];

    return day + '-' + month + '-' + year;
  }

}
