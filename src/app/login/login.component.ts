import { Component, OnInit } from '@angular/core';
import {MatFormField} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormControl } from '@angular/forms';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public pin

  constructor(private http:HttpClient, private router:Router) {  }

  ngOnInit() {
    if(localStorage.getItem("mytoken")){
      this.router.navigate(['dashboard'])
    }
  }

  submit(pin){
    this.http.post(`${environment.backendApi}/authenticate`, { pin }).subscribe(res =>{
      localStorage.setItem("mytoken", res['token'])
      this.router.navigate([`dashboard`])
    })
  }
}
