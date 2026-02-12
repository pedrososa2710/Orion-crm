import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeControlRoutingModule } from './employee-control-routing.module';
import { EmployeeControlComponent } from './employee-control.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeeControlComponent],
  imports: [CommonModule, EmployeeControlRoutingModule, ReactiveFormsModule],
})
export class EmployeeControlModule {}
