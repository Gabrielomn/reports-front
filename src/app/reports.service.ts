import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  headers

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer' + 'placeholder',
      'Content-Type':  'application/json'
    })

    console.log(this.headers.keys())
    console.log(this.headers.get('Authorization'))

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
