import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEmployee } from '@app/Model/employee.model';
import { DbService } from '@app/manage/services/database.service';
import { AlertService } from '@app/manage/services/alert.service';
import { Location } from '@angular/common';
import { DB_PATHS, ALERT_MESSAGES } from '@app/utils/constants';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  standalone: false,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit, OnDestroy {
  private db = inject(DbService);
  private alert = inject(AlertService);
  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  employee: IEmployee | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.loadEmployee();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadEmployee(): void {
    const id = this.getEmployeeId();
    if (!id) {
      this.alert.error('No se encontró el ID del empleado');
      return;
    }

    this.isLoading = true;
    this.db
      .object<IEmployee>(DB_PATHS.EMPLOYEE_BY_ID(id))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.employee = this.transformAddresses(data);
          this.isLoading = false;
        },
        error: (err) => {
          this.alert.error(ALERT_MESSAGES.GENERIC_ERROR);
          this.isLoading = false;
        },
      });
  }

  deleteEmployee(): void {
    const id = this.getEmployeeId();
    if (!id) return;

    this.db.remove(DB_PATHS.EMPLOYEE_BY_ID(id)).then(
      () => {
        this.alert.successBack(ALERT_MESSAGES.EMPLOYEE_DELETED);
      },
      (err) => {
        this.alert.error(ALERT_MESSAGES.GENERIC_ERROR);
      },
    );
  }

  deleteAddress(employeeId: string, addressId: string): void {
    this.db.remove(DB_PATHS.EMPLOYEE_ADDRESS(employeeId, addressId)).then(
      () => {
        this.alert.success(ALERT_MESSAGES.ADDRESS_DELETED);
        this.loadEmployee();
      },
      (err) => {
        this.alert.error(ALERT_MESSAGES.GENERIC_ERROR);
      },
    );
  }

  goBack(): void {
    this.location.back();
  }

  private getEmployeeId(): string {
    return this.activatedRoute.snapshot.params['id'] || '';
  }

  private transformAddresses(employee: IEmployee): IEmployee {
    if (
      employee.addresses &&
      typeof employee.addresses === 'object' &&
      !Array.isArray(employee.addresses)
    ) {
      employee.addresses = Object.values(employee.addresses);
    }
    return employee;
  }
}
