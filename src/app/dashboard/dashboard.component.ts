import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service'
import { Report } from '../../models/report'
import { PostReportComponent } from '../post-report/post-report.component'
import { UpdateReportComponent } from '../update-report/update-report.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reports:Array<Report>
  currentTitle: string;
  base_url

  constructor(private reportService:ReportsService,
    private modalService:NgbModal, private router:Router
    ) {
      this.updateReports()
      this.base_url = "http://localhost:4200/"
   }

  ngOnInit() {
    
    this.updateReports()
    if(!(localStorage.getItem("mytoken"))){
      this.router.navigate([`/`],{relativeTo:this.base_url})
    }
  }


  remove(_id){
    this.reportService.deleteReport(_id).subscribe(() =>{
      this.updateReports()
    })
  }


  updateReports(){
    this.reportService.getReports().subscribe(data =>{
      this.reports = data.map(report => new Report(report))
    })
  }


  openPostForm(){
    const modalRef = this.modalService.open(PostReportComponent)
    modalRef.result.then((result) => {
      this.updateReports()
    }).catch((error) => {
      console.log(error)
    })
  }

  openUpdateForm(report:Report){
    let modalRef = this.modalService.open(UpdateReportComponent)
    modalRef.componentInstance.title = report.title
    modalRef.componentInstance.theme = report.theme
    modalRef.componentInstance.description = report.description
    modalRef.componentInstance.link = report.link
    modalRef.componentInstance.imgLink = report.imgLink
    modalRef.componentInstance.id = report._id
    modalRef.result.then((result) => {
      this.updateReports()
    }).catch((error) => {
      console.log(error)
    })
  }
}