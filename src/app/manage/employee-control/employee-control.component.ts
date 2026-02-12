import { Component, inject } from '@angular/core';
import { Employee } from '@app/Model/employee.model';
import { DbService } from '@app/manage/services/database.service';

@Component({
  selector: 'app-employee-control',
  standalone: false,
  templateUrl: './employee-control.component.html',
  styleUrl: './employee-control.component.scss',
})
export class EmployeeControlComponent {
  private db = inject(DbService);
  employees: Employee[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.db.list('employees').subscribe((data) => {
      this.employees = data.map((employee: Employee) => {
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
    });
  }

  getFilteredEmployees(): Employee[] {
    if (!this.searchTerm.trim()) {
      return this.employees;
    }

    const term = this.searchTerm.toLowerCase();
    return this.employees.filter(
      (employee) =>
        employee.employeeName.toLowerCase().includes(term) ||
        employee.id.toLowerCase().includes(term),
    );
  }
}
