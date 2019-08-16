import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  headers

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':'placeholder'
    })

  }

  getReports(){
    return this.http.get<Array<Object>>('http://localhost:8080/report')
  }

  deleteReport(id){
    console.log(`deleting ${id}`)
    return this.http.delete(`http://localhost:8080/report/${id}`,this.headers)
  }
  
  updateReport(id, report){
    console.log(`updating ${id}`)
    return this.http.put(`http://localhost:8080/report/${id}`, report, this.headers)
  }

  createReport(report){
    return this.http.post("http://localhost:8080/report", report, this.headers)
  }

}
