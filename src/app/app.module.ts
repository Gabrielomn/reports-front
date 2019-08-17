import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostReportComponent } from './post-report/post-report.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateReportComponent } from './update-report/update-report.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PostReportComponent,
    UpdateReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,

  ],
  entryComponents:[
    PostReportComponent,
    UpdateReportComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
