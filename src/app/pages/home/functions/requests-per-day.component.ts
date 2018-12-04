import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RequestsService} from '../../../services/requests.service';
import {StoredFunction2} from '../../../domain/stored-function-2';

@Component({
  selector: 'app-sf2',
  templateUrl: 'requests-per-day.component.html'
})

export class RequestsPerDayComponent implements OnInit {
  requestForm: FormGroup;
  public results: StoredFunction2[];
  public loading = false;

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
        error => console.log(error)
      );
    }
  }
}
