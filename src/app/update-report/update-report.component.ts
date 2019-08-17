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


  
  constructor(private activeModal:NgbActiveModal,
    private reportService:ReportsService, ) {


  }
  ngOnInit() {
  }

  submit(title,theme,description,link,imgLink, id){
    this.reportService.updateReport(id, {
      title,
      theme,
      description,
      link,
      imgLink
    }).subscribe(data=>{
      console.log(data)
      this.closeModal()
    })
  }

  closeModal(){
    this.activeModal.close('Modal closed')
  }
}
