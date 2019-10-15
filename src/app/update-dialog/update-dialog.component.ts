import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Inject } from '@angular/core'; 
import {FormGroup, FormBuilder, ReactiveFormsModule,FormsModule} from '@angular/forms' 
import { ReportsService } from "../reports.service"

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {
  form: FormGroup
  title:string
  description:string
  theme:string
  imgLink:string
  link:string

  constructor(
    private reports:ReportsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.title = data.title
      this.theme = data.theme
      this.description = data.description
      this.imgLink = data.imgLink
      this.link = data.link
    }
  ngOnInit() {
    this.form = this.fb.group({
      title: [this.title, []],
      description: [this.description, []],
      theme: [this.theme, []],
      link: [this.link, []],
      imgLink: [this.imgLink, []]
      });
  }

  save(){
    this.dialogRef.close(this.form.value)
  }

  close(){
    this.dialogRef.close();
  }

}
