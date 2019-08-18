import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { ReportsService } from '../reports.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-update-report',
  templateUrl: './update-report.component.html',
  styleUrls: ['./update-report.component.css']
})
export class UpdateReportComponent implements OnInit {

  urlRegexp = new RegExp("^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(.)*$")

  
  constructor(private activeModal:NgbActiveModal,
    private reportService:ReportsService, ) {


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
      })
    }
  }

  closeModal(){
    this.activeModal.close('Modal closed')
  }

  validateData(title, theme, description, link, imgLink){
    if(!(this.urlRegexp.test(link) && this.urlRegexp.test(imgLink))){
      alert("INVALID URL")
      return false
    }else if(title.length > 80 || description.length > 80){
      alert("STRING LONGA DEMAIS, TEM QUE TER ATÉ 80 CARACTERES")
      return false
    }
    return true;
  }
}
