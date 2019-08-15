import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reports:Object
  
  constructor(private reportService:ReportsService) {

   }

  ngOnInit() {
    this.reportService.getReports().subscribe(data =>{
      console.log(data)
      this.reports = data
    })
  }

}
