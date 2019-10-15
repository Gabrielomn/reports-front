import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { environment } from "../../environments/environment"
import { ReportsService } from "../reports.service"
import {MatDialog, MatDialogConfig} from "@angular/material";
import {UpdateDialogComponent} from '../update-dialog/update-dialog.component'
import {PostDialogComponent} from '../post-dialog/post-dialog.component'

import {FormGroup, FormBuilder, ReactiveFormsModule,FormsModule} from '@angular/forms' 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reports:Array<Object>
  displayedColumns: string[] = ['Título', 'Tema', 'Descrição', 'Link', 'Image Link', 'Actions']
  constructor(private router:Router, private reportsService:ReportsService, private acRoute:ActivatedRoute, private dialog:MatDialog) {   
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

  update(report:Object){

    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true;

    dialogConfig.data = report
    const dialogRef = this.dialog.open(UpdateDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((data) =>{
      this.reportsService.updateReport(report['_id'], data).subscribe(() =>{
        this.updateReports()
      })
    })
  }

  delete(id:String){
    this.reportsService.deleteReport(id).subscribe(() =>{
      this.updateReports();
    });
  }

  post(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(PostDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((data) =>{
      this.reportsService.createReport(data).subscribe(() =>{
        this.updateReports()
      })
    })
  }
}
