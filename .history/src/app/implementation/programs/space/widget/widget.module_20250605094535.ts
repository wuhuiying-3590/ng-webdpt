import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetRoutingModule } from './widget-routing.module';
import { WidgetComponent } from './widget.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ComponentPanelComponent } from './component-panel/component-panel.component';
import { PropertyPanelComponent } from './property-panel/property-panel.component';
import { DesignCanvasComponent } from './design-canvas/design-canvas.component';
import { ListItemComponent } from './list-item/list-item.component';
@NgModule({
  declarations: [
    WidgetComponent,
    ComponentPanelComponent,
    PropertyPanelComponent,
    DesignCanvasComponent,
    ListItemComponent,
  ],
  imports: [
    CommonModule,
    WidgetRoutingModule,
    NzLayoutModule,
    NzCollapseModule,
    NzButtonModule,
    NzIconModule,
    NzTabsModule,
    NzEmptyModule,
    NzSelectModule,
    NzRadioModule,
  ],
  exports: [DesignCanvasComponent，ListItemComponent],
})
export class WidgetModule {}
