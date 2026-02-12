import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Employee } from '@app/Model/employee.model';
import { DbService } from '@app/manage/services/database.service';
import { DB_PATHS, ALERT_MESSAGES } from '@app/utils/constants';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-employee-control',
  standalone: false,
  templateUrl: './employee-control.component.html',
  styleUrl: './employee-control.component.scss',
})
export class EmployeeControlComponent implements OnInit, OnDestroy {
  private db = inject(DbService);
  private destroy$ = new Subject<void>();

  employees: Employee[] = [];
  searchControl = new FormControl('');
  isLoading = false;

  ngOnInit(): void {
    this.loadEmployees();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadEmployees(): void {
    this.isLoading = true;
    this.db
      .list<Employee>(DB_PATHS.EMPLOYEES)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.employees = this.transformEmployees(data);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading employees:', err);
          this.isLoading = false;
        },
      });
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(300), takeUntil(this.destroy$))
      .subscribe(() => {
        // Trigger change detection
      });
  }

  getFilteredEmployees(): Employee[] {
    const searchTerm = (this.searchControl.value || '').toLowerCase();

    if (!searchTerm.trim()) {
      return this.employees;
    }

    return this.employees.filter(
      (employee) =>
        employee.employeeName.toLowerCase().includes(searchTerm) ||
        employee.id.toLowerCase().includes(searchTerm),
    );
  }

  trackByEmployeeId(index: number, employee: Employee): string {
    return employee.id;
  }

  private transformEmployees(data: Employee[]): Employee[] {
    return data.map((employee) => {
      if (
        employee.addresses &&
        typeof employee.addresses === 'object' &&
        !Array.isArray(employee.addresses)
      ) {
        employee.addresses = Object.values(employee.addresses);
      } else if (!employee.addresses) {
        employee.addresses = [];
      }
      return employee;
    });
  }
}
