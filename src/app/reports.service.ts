import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  headers

  constructor(private http: HttpClient, private router:Router) {
    this.router.events.subscribe(event => {      
      if(event['urlAfterRedirects']){
        if(event['urlAfterRedirects'] == "/dashboard")
        
        this.headers = new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem("mytoken"),
          'Content-Type':  'application/json'
          })
      } 
    })
  }

  getReports(){
    return this.http.get<Array<Object>>('http://localhost:8080/report', {headers:this.headers})
  }

  deleteReport(id){
    console.log(`deleting ${id}`)
    return this.http.delete(`http://localhost:8080/report/${id}`,{headers:this.headers})
  }
  
  updateReport(id, report){
    console.log(`updating ${id}`)
    return this.http.put(`http://localhost:8080/report/${id}`, report, {headers:this.headers})
  }

  createReport(report){
    return this.http.post("http://localhost:8080/report", report, {headers:this.headers})
  }

}
