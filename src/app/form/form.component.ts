import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Report } from '../../models/report'
import { ReportsService } from '../reports.service'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input('report') report: Report


  constructor() { 
  }

  ngOnInit() {
  }

}
