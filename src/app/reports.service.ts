import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReportsService {



  constructor(private http: HttpClient) { 
    
  }

  getReports(){
    return this.http.get<Array<Object>>('http://localhost:8080/report')
  }

  deleteReport(title){
    //todo
  }

  updateReport(title){
    //todo
  }

  createReport(title){
    //todo
  }

}
