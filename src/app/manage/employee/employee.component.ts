import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEmployee } from '@app/Model/employee.model';
import { DbService } from '@app/manage/services/database.service';
import { AlertService } from '@app/manage/services/alert.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: false,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  private db = inject(DbService);
  private alert = inject(AlertService);
  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);

  employee: IEmployee = undefined as any;
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.loadData(id);
  }

  deleteEmployee() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.db.remove(`employees/${id}`).then(() => {
      this.alert.successBack('Empleado eliminado exitosamente');
    });
  }

  deleteAddress(employeeId: any, addressId: string) {
    this.db
      .remove(`employees/${employeeId}/addresses/${addressId}`)
      .then(() => {
        this.alert.success('Dirección eliminada exitosamente');
        this.loadData(employeeId);
      });
  }

  loadData(id: string) {
    this.db.once(`employees/${id}`, (data) => {
      if (data.addresses) data.addresses = Object.values(data.addresses);

      this.employee = data;
    });
  }

  goBack() {
    this.location.back();
  }
}
