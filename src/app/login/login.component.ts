import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from "@angular/router"
import { DashboardComponent } from '../dashboard/dashboard.component'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pin;
  base_url = "http://localhost:4200/"
  constructor(private http: HttpClient, private router:Router) { 
    this.pin = new FormControl('')
  }

  ngOnInit() {
    if(localStorage.getItem("mytoken")){
      this.router.navigate([`dashboard`])
    }
  }

  login(pin){
    this.http.post("http://localhost:8080/authenticate", {pin}).subscribe(res => {
      console.log(res)
      localStorage.setItem("mytoken", res['token'])
      this.router.navigate([`dashboard`])
    })
  }

}
