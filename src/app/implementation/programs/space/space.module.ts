import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpaceRoutingModule } from './space-routing.module';

const programsModules = [

];

@NgModule({
  imports: [
    CommonModule,
    SpaceRoutingModule,
    ...programsModules
  ],
  declarations: []
})
export class SpaceModule { }
