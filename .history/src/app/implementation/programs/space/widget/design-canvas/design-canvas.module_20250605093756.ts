import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListItemComponent } from '../list-item/list-item.component';
@NgModule({
  declarations: [
    WidgetComponent,
    ComponentPanelComponent,
    PropertyPanelComponent,
    DesignCanvasComponent,
    // ListItemComponent,
  ],
  imports: [CommonModule],
})
export class DesignCanvasModule {}
