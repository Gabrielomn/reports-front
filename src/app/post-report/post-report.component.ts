import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { ReportsService } from '../reports.service'
import { Router } from "@angular/router"
import { environment } from '../../environments/environment'
@Component({
  selector: 'app-post-report',
  templateUrl: './post-report.component.html',
  styleUrls: ['./post-report.component.css']
})
export class PostReportComponent implements OnInit {

  urlRegexp = new RegExp("^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(.)*$")


  title
  theme
  description
  link
  imgLink
  base_url

  constructor(private activeModal:NgbActiveModal,
    private reportService:ReportsService, private router:Router) {
    this.title = new FormControl('')
    this.theme = new FormControl('')
    this.description = new FormControl('')
    this.link = new FormControl('')
    this.imgLink = new FormControl('')
    this.base_url = environment.baseUrl
  }

  ngOnInit() {
  }

  closeModal(){
    this.activeModal.close('Modal closed')
  }

  submit(title, theme, description, link, imgLink){
    if(this.validateData(title, theme, description, link,imgLink)){
      this.reportService.createReport({
        title : title.value,
        theme : theme.value,
        description : description.value,
        link : link.value,
        imgLink : imgLink.value
      }).subscribe(data => {
        this.closeModal()
      }, err => {
        console.log(err)
        if(err['statusText'] =="Unauthorized"){
          localStorage.clear()
          this.closeModal()
          this.router.navigate([`/`],{relativeTo:this.base_url})

        }
      })
    }
  }

  validateData(title, theme, description, link, imgLink){
    if(!(this.urlRegexp.test(link.value) && this.urlRegexp.test(imgLink.value))){
      alert("INVALID URL\n")
      return false
    }else if(title.value.length > 80 || description.value.length > 80){
      alert(`String longa demais, deve ter até 80 caracteres\n${title.value.length > 80 ? "title" : ""}\n${description.value.length > 80 ? "description" : ""}`)
      return false
    }
    return true;
  }
}
