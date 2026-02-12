import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEmployeeRoutingModule } from './new-employee-routing.module';
import { NewEmployeeComponent } from './new-employee.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewEmployeeComponent],
  imports: [CommonModule, NewEmployeeRoutingModule, ReactiveFormsModule],
})
export class NewEmployeeModule {}
