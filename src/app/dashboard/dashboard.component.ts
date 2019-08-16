import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service'
import { Report } from '../../models/report'
import { PostReportComponent } from '../post-report/post-report.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reports:Array<Report>
  
  constructor(private reportService:ReportsService,
    private modalService:NgbModal
    ) {

   }

  ngOnInit() {
    this.updateReports()
  }


  remove(_id){
    this.reportService.deleteReport(_id).subscribe(() =>{
      this.updateReports()
    })
  }

  update(_id){
    for(let r of this.reports){
      if(r._id == _id){
        r.active = true
      }
      console.log(r)
    }
  }

  updateReports(){
    this.reportService.getReports().subscribe(data =>{
      this.reports = data.map(report => new Report(report))
    })
  }


  openModalForm(){
    const modalRef = this.modalService.open(PostReportComponent)
    modalRef.result.then((result) => {
      this.updateReports()
    }).catch((error) => {
      console.log(error)
    })
  }
}