import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DbService } from '../services/database.service';
import { AlertService } from '../services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-address',
  standalone: false,
  templateUrl: './new-address.component.html',
  styleUrl: './new-address.component.scss',
})
export class NewAddressComponent implements OnInit {
  private fb = inject(FormBuilder);
  private db = inject(DbService);
  private alert = inject(AlertService);
  private activatedRoute = inject(ActivatedRoute);
  private location = inject(Location);
  addressForm!: UntypedFormGroup;
  editingAddress: boolean = false;
  employeeID!: string;

  ngOnInit(): void {
    this.employeeID = this.activatedRoute.snapshot.params['employeeID'];
    const addressID = this.activatedRoute.snapshot.params['id'];
    if (addressID) {
      this.editingAddress = true;
      this.initEdit(addressID);
    }

    this.addressForm = this.fb.group({
      id: [this.getDirectionID()],
      street: ['', Validators.required],
      number: ['', Validators.required],
      paraje: ['', Validators.required],
      pueblo: ['', Validators.required],
      province: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  saveAddress() {
    const newAddress = this.addressForm.value;
    if (this.addressForm.valid) {
      this.db
        .set(
          `employees/${this.employeeID}/addresses/${newAddress.id}`,
          newAddress,
        )
        .then(() => {
          this.alert.successBack(
            this.editingAddress
              ? 'Dirección actualizada exitosamente'
              : 'Dirección creada exitosamente',
          );
        });
    } else {
      this.showFormErrors();
    }
  }

  private showFormErrors() {
    const errors = this.getFormErrors();
    const errorList = Object.entries(errors)
      .map(
        ([field, messages]) =>
          `<strong>${field}:</strong> ${messages.join(', ')}`,
      )
      .join('<br>');

    this.alert.error(
      `Por favor, corrija los siguientes errores:<br><br>${errorList}`,
    );
  }

  private getFormErrors(): { [key: string]: string[] } {
    const errors: { [key: string]: string[] } = {};
    const fieldLabels: { [key: string]: string } = {
      street: 'Calle',
      number: 'Número',
      paraje: 'Paraje',
      pueblo: 'Pueblo',
      province: 'Provincia',
      type: 'Tipo de dirección',
    };

    Object.keys(this.addressForm.controls).forEach((key) => {
      const control = this.addressForm.get(key);
      if (control && control.errors) {
        errors[fieldLabels[key] || key] = this.getErrorMessages(
          key,
          control.errors,
        );
      }
    });

    return errors;
  }

  private getErrorMessages(fieldName: string, errors: any): string[] {
    const messages: string[] = [];

    if (errors['required']) {
      messages.push('Este campo es requerido');
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
    this.db
      .object(`employees/${this.employeeID}/addresses/${id}`)
      .subscribe((address) => {
        if (address) {
          this.addressForm.patchValue(address);
        }
      });
  }

  getDirectionID() {
    return Date.now().toString();
  }
  goBack() {
    this.location.back();
  }
}
