import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-search-for-incidents',
  templateUrl: 'search-for-incidents.component.html'
})

export class SearchForIncidentsComponent implements OnInit {
  errormessage: string;
  searchForm: FormGroup;

  formDefinition = {
    zipCode: [''],
    address: ['']
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group(this.formDefinition);
  }
}
