import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAddressComponent } from './new-address.component';

const routes: Routes = [{ path: '', component: NewAddressComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewAddressRoutingModule { }
