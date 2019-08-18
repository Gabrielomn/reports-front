import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { ReportsService } from '../reports.service'

@Component({
  selector: 'app-post-report',
  templateUrl: './post-report.component.html',
  styleUrls: ['./post-report.component.css']
})
export class PostReportComponent implements OnInit {

  urlRegexp = new RegExp("^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$")


  title
  theme
  description
  link
  imgLink
  
  constructor(private activeModal:NgbActiveModal,
    private reportService:ReportsService) {
    this.title = new FormControl('')
    this.theme = new FormControl('')
    this.description = new FormControl('')
    this.link = new FormControl('')
    this.imgLink = new FormControl('')

  }

  ngOnInit() {
  }

  closeModal(){
    this.activeModal.close('Modal closed')
  }

  submit(title, theme, description, link, imgLink){
    if(!(this.urlRegexp.test(link) && this.urlRegexp.test(imgLink))){
      alert("INVALID URL FORMAT")
    }else{
      this.reportService.createReport({
        title : title.value,
        theme : theme.value,
        description : description.value,
        link : link.value,
        imgLink : imgLink.value
      }).subscribe(data => {
        this.closeModal()
      })
    }
  }
}
