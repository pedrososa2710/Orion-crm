import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { SwalDirective, SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [EmployeeComponent],
  imports: [CommonModule, EmployeeRoutingModule, SwalDirective, SwalComponent],
})
export class EmployeeModule {}
