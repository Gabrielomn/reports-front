import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service'
import { Report } from '../../models/report'
import { PostReportComponent } from '../post-report/post-report.component'
import { UpdateReportComponent } from '../update-report/update-report.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router"
import { environment } from '../../environments/environment'
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
      this.base_url = environment.baseUrl
      this.router.events.subscribe(event => {
        if(event['urlAfterRedirects']){
          if(event['urlAfterRedirects'] == "/dashboard")
          this.updateReports()
        }
      })

   }

  ngOnInit() {
  
    if(!(localStorage.getItem("mytoken"))){
      this.router.navigate([`/`],{relativeTo:this.base_url})
    }else{
      this.updateReports()
    }
  }


  remove(_id){
    this.reportService.deleteReport(_id).subscribe(() =>{
      this.updateReports()
    }, err => {
      console.log(err)
      if(err['statusText'] =="Unauthorized"){
        localStorage.clear()
        this.router.navigate([`/`],{relativeTo:this.base_url})
      }
    })
  }


  updateReports(){
  
    this.reportService.getReports().subscribe(data =>{
      console.log(data)
      this.reports = data.map(report => new Report(report))
    }, err => {
      console.log(err)
      if(err['statusText'] =="Unauthorized"){
        localStorage.clear()
        this.router.navigate([`/`],{relativeTo:this.base_url})
      }
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