import { NgModule, ModuleWithProviders } from "@angular/core";
import {RouterModule} from "@angular/router";

import { AuthComponent } from './auth.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthComponent
  ],
  providers: []
})
export class AuthModule {}
