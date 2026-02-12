import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeControlComponent } from './employee-control.component';

const routes: Routes = [{ path: '', component: EmployeeControlComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeControlRoutingModule { }
