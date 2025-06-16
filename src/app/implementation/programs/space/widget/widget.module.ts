import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ComponentPanelComponent } from './component-panel/component-panel.component';
import { PropertyPanelComponent } from './property-panel/property-panel.component';
import { DesignCanvasComponent } from './design-canvas/design-canvas.component';
import { ListItemComponent } from './list-item/list-item.component';
import { EditPopComponent } from './edit-pop/edit-pop.component';
import { SortablejsModule } from 'ngx-sortablejs';

@NgModule({
  declarations: [
    WidgetComponent,
    ComponentPanelComponent,
    PropertyPanelComponent,
    DesignCanvasComponent,
    ListItemComponent,
    EditPopComponent,
  ],
  imports: [
    CommonModule,
    WidgetRoutingModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzCollapseModule,
    NzButtonModule,
    NzIconModule,
    NzTabsModule,
    NzEmptyModule,
    NzSelectModule,
    NzRadioModule,
    NzSwitchModule,
    NzMessageModule,
    NzInputNumberModule,
    SortablejsModule,
  ],
})
export class WidgetModule {}
