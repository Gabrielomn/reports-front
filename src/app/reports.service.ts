import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Router } from "@angular/router"
import { environment } from '../environments/environment'
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
    return this.http.get<Array<Object>>(`${environment.api}/report`, {headers:this.headers})
  }

  deleteReport(id){
    console.log(`deleting ${id}`)
    return this.http.delete(`${environment.api}/report/${id}`,{headers:this.headers})
  }
  
  updateReport(id, report){
    console.log(`updating ${id}`)
    return this.http.put(`${environment.api}/report/${id}`, report, {headers:this.headers})
  }

  createReport(report){
    return this.http.post(`${environment.api}/report`, report, {headers:this.headers})
  }

}
