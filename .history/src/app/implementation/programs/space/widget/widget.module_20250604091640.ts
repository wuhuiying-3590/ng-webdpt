import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetRoutingModule } from './widget-routing.module';
import { WidgetComponent } from './widget.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ComponentPanelComponent } from './component-panel/component-panel.component';

@NgModule({
  declarations: [WidgetComponent, ComponentPanelComponent],
  imports: [
    CommonModule,
    WidgetRoutingModule,
    NzLayoutModule,
    NzCollapseModule,
    NzButtonModule,
    NzIconModule,
  ],
})
export class WidgetModule {}
