import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeControlRoutingModule } from './employee-control-routing.module';
import { EmployeeControlComponent } from './employee-control.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeeControlComponent],
  imports: [CommonModule, EmployeeControlRoutingModule, FormsModule],
})
export class EmployeeControlModule {}
