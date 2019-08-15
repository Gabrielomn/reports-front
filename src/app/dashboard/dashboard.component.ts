import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service'
import { Report } from '../../models/report'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reports:Array<Report>
  
  constructor(private reportService:ReportsService) {

   }

  ngOnInit() {
    this.reportService.getReports().subscribe(data =>{
      console.log(data)
      this.reports = data.map(report => new Report(report))
      console.log(this.reports)
    })
  }


  remove(_id){
    console.log(_id)
  }

  update(_id){
    for(let r of this.reports){
      if(r._id == _id){
        r.active = true
      }
      console.log(r)
    }
  }


}