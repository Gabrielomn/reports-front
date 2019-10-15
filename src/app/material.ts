import {MatButtonModule, MatCheckboxModule,MatSelectModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material'
import { NgModule } from '@angular/core';
import {MatDialogModule} from "@angular/material";

@NgModule({
  imports: [MatSelectModule,MatDialogModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatTableModule],
  exports: [MatSelectModule,MatDialogModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatTableModule],
})
export class MaterialModule { }