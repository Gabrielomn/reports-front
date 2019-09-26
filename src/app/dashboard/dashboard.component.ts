import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { environment } from "../../environments/environment"
import { ReportsService } from "../reports.service"
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reports:Array<Object>
  displayedColumns: string[] = ['Título', 'Tema', 'Descrição', 'Link', 'Image Link']
    constructor(private router:Router, private reportsService:ReportsService, private acRoute:ActivatedRoute) { 
  }

  ngOnInit() {
    if(!(localStorage.getItem("mytoken"))){
      this.router.navigate([`/`],{relativeTo:this.acRoute})
    }else{
      this.updateReports()
    }
  }
  updateReports(){
  
    this.reportsService.getReports().subscribe(data => {
      console.log(data)
      this.reports = data
    }, err => {
      if(err['statusText'] =="Unauthorized"){
        localStorage.clear()
        this.router.navigate([`/`],{relativeTo:this.acRoute})
      }
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate([`/`],{relativeTo:this.acRoute})

  }
}
