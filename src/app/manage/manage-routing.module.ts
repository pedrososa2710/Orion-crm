import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage.component';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent,
    children: [
      {
        path: 'control',
        loadChildren: () =>
          import('./employee-control/employee-control.module').then(
            (m) => m.EmployeeControlModule,
          ),
      },
      {
        path: 'employee/:id',
        loadChildren: () =>
          import('./employee/employee.module').then((m) => m.EmployeeModule),
      },
      {
        path: 'new-employee',
        loadChildren: () =>
          import('./new-employee/new-employee.module').then(
            (m) => m.NewEmployeeModule,
          ),
      },
      {
        path: 'new-employee/:id',
        loadChildren: () =>
          import('./new-employee/new-employee.module').then(
            (m) => m.NewEmployeeModule,
          ),
      },
      {
        path: 'new-address/:employeeID',
        loadChildren: () =>
          import('./new-address/new-address.module').then(
            (m) => m.NewAddressModule,
          ),
      },
      {
        path: 'new-address/:employeeID/:id',
        loadChildren: () =>
          import('./new-address/new-address.module').then(
            (m) => m.NewAddressModule,
          ),
      },
      {
        path: '',
        redirectTo: 'control',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRoutingModule {}
