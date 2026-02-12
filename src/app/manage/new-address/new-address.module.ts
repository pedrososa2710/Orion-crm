import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewAddressRoutingModule } from './new-address-routing.module';
import { NewAddressComponent } from './new-address.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewAddressComponent],
  imports: [CommonModule, NewAddressRoutingModule, ReactiveFormsModule],
})
export class NewAddressModule {}
