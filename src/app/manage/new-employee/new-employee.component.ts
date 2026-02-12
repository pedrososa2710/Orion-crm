import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { generateOtkId } from '@app/utils/id-generator';
import { DbService } from '@app/manage/services/database.service';
import { AlertService } from '@app/manage/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-employee',
  standalone: false,
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
})
export class NewEmployeeComponent implements OnInit {
  private fb = inject(FormBuilder);
  private db = inject(DbService);
  private alert = inject(AlertService);
  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);

  employeeForm!: UntypedFormGroup;
  editingEmployee: boolean = false;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.editingEmployee = true;
      this.initEdit(id);
    }

    const employeeId = generateOtkId();

    this.employeeForm = this.fb.group({
      id: [employeeId],
      employeeName: ['', Validators.required],
      role: ['', Validators.required],
      mode: ['', Validators.required],
      assignedTo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      status: ['Active'],
    });
  }

  saveEmployee() {
    if (this.employeeForm.valid) {
      const newEmployee = this.employeeForm.value;
      this.db.set(`employees/${newEmployee.id}`, newEmployee).then(() => {
        this.alert.successBack(
          this.editingEmployee
            ? 'Empleado actualizado exitosamente'
            : 'Empleado creado exitosamente',
        );
      });
    } else {
      this.showFormErrors();
    }
  }

  private showFormErrors() {
    const errors = this.getFormErrors();
    const errorList = Object.entries(errors)
      .map(([field, messages]) => `<strong>${field}:</strong> ${messages.join(', ')}`)
      .join('<br>');

    this.alert.error(
      `Por favor, corrija los siguientes errores:<br><br>${errorList}`,
    );
  }

  private getFormErrors(): { [key: string]: string[] } {
    const errors: { [key: string]: string[] } = {};
    const fieldLabels: { [key: string]: string } = {
      employeeName: 'Nombre completo',
      role: 'Cargo',
      mode: 'Modalidad',
      assignedTo: 'Asignado a',
      email: 'Email',
      phone: 'Teléfono',
    };

    Object.keys(this.employeeForm.controls).forEach((key) => {
      const control = this.employeeForm.get(key);
      if (control && control.errors) {
        errors[fieldLabels[key] || key] = this.getErrorMessages(key, control.errors);
      }
    });

    return errors;
  }

  private getErrorMessages(fieldName: string, errors: any): string[] {
    const messages: string[] = [];

    if (errors['required']) {
      messages.push('Este campo es requerido');
    }
    if (errors['email']) {
      messages.push('Email inválido');
    }
    if (errors['pattern']) {
      if (fieldName === 'phone') {
        messages.push('El teléfono debe tener 10 dígitos');
      } else {
        messages.push('Formato inválido');
      }
    }
    if (errors['minlength']) {
      messages.push(`Mínimo ${errors['minlength'].requiredLength} caracteres`);
    }
    if (errors['maxlength']) {
      messages.push(`Máximo ${errors['maxlength'].requiredLength} caracteres`);
    }

    return messages;
  }

  initEdit(id: string) {
    this.db.object(`employees/${id}`).subscribe((employee) => {
      if (employee) {
        this.employeeForm.patchValue(employee);
      }
    });
  }
  goBack() {
    this.location.back();
  }
}
