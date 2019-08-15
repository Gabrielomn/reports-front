import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReportsService {



  constructor(private http: HttpClient) { 
    
  }

  getReports(){
    console.log("yo")
    return this.http.get('http://localhost:8080/report')
  }


}
