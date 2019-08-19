import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { ReportsService } from '../reports.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Router } from "@angular/router"
import { environment } from '../../environments/environment'
@Component({
  selector: 'app-update-report',
  templateUrl: './update-report.component.html',
  styleUrls: ['./update-report.component.css']
})
export class UpdateReportComponent implements OnInit {

  urlRegexp = new RegExp("^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(.)*$")
  baseUrl
  
  constructor(private activeModal:NgbActiveModal,
    private reportService:ReportsService, private router:Router ) {
      this.baseUrl = environment.baseUrl

  }
  ngOnInit() {
  }

  submit(title,theme,description,link,imgLink, id){
    if(this.validateData(title, theme,description,link,imgLink)){
      this.reportService.updateReport(id, {
        title,
        theme,
        description,
        link,
        imgLink
      }).subscribe(data=>{
        this.closeModal()
      }, err => {
        console.log("ALO PORRA")
        console.log(err)
        if(err['statusText'] =="Unauthorized"){
          localStorage.clear()
          this.closeModal()
          this.router.navigate([`/`],{relativeTo:this.baseUrl})
        }
      })
    }
  }

  closeModal(){
    this.activeModal.close('Modal closed')
  }

  validateData(title, theme, description, link, imgLink){
    if(!(this.urlRegexp.test(link.value) && this.urlRegexp.test(imgLink.value))){
      alert(`INVALID URL\n`)
      return false
    }else if(title.length > 80 || description.length > 80){
      alert(`Os seguintes campos foram longos demais, deve ter até 80 caracteres\n${title.length > 80 ? "title" : ""}\n${description.length > 80 ? "description" : ""}`)
      return false
    }
    return true;
  }
}
