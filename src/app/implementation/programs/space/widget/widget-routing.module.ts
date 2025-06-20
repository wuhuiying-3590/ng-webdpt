import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetComponent } from './widget.component';
import { DwLanguageService } from '@webdpt/framework/language';
import { DwAuthGuardService } from '@webdpt/framework/auth';
import { ComponentPanelComponent } from './component-panel/component-panel.component';
import { PropertyPanelComponent } from './property-panel/property-panel.component';
import { DesignCanvasComponent } from './design-canvas/design-canvas.component';
import { ListItemComponent } from './list-item/list-item.component';
import { EditPopComponent } from './edit-pop/edit-pop.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    canActivate: [DwAuthGuardService],
    data: {
      dwRouteData: {
        programId: 'widget',
        dwAuthId: 'widget',
      },
    },
    resolve: {
      transaction: DwLanguageService,
    },
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        component: WidgetComponent,
        canActivate: [DwAuthGuardService],
        data: {
          dwRouteData: {
            dwAuthId: 'widget',
          },
        },
      },
      {
        path: 'component-panel',
        component: ComponentPanelComponent,
        canActivate: [DwAuthGuardService],
        data: {
          dwRouteData: {
            dwAuthId: 'component-panel',
          },
        },
      },
      {
        path: 'property-panel',
        component: PropertyPanelComponent,
        canActivate: [DwAuthGuardService],
        data: {
          dwRouteData: {
            dwAuthId: 'property-panel',
          },
        },
      },
      {
        path: 'design-canvas',
        component: DesignCanvasComponent,
        canActivate: [DwAuthGuardService],
        data: {
          dwRouteData: {
            dwAuthId: 'design-canvas',
          },
        },
      },
      {
        path: 'list-item',
        component: ListItemComponent,
        canActivate: [DwAuthGuardService],
        data: {
          dwRouteData: {
            dwAuthId: 'list-item',
          },
        },
      },
      {
        path: 'edit-pop',
        component: EditPopComponent,
        canActivate: [DwAuthGuardService],
        data: {
          dwRouteData: {
            dwAuthId: 'edit-pop'
          }
        }
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WidgetRoutingModule { }
