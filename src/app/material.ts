import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material'
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatTableModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatTableModule],
})
export class MaterialModule { }