import { Component, OnInit, inject } from '@angular/core';
import { DbService } from '@app/manage/services/database.service';
import { Employee } from '@app/Model/employee.model';

@Component({
  selector: 'app-manage',
  standalone: false,
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss',
})
export class ManageComponent {}
