import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericComponent } from './generic/generic.component';
import { GenericRateLimitedComponent } from './generic-rate-limited/generic-rate-limited.component';

const routes: Routes = [
  {path:'generic', component:GenericComponent},
  {path:'genericRateLimited', component: GenericRateLimitedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
