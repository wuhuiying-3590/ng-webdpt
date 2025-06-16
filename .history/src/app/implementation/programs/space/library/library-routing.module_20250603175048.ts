import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library.component';
import { DwLanguageService } from '@webdpt/framework/language';
import { DwAuthGuardService } from '@webdpt/framework/auth';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    canActivate: [DwAuthGuardService],
    data: {
      dwRouteData: {
        programId: 'library',
        dwAuthId: 'library'
      }
    },
    resolve: {
      transaction: DwLanguageService
    },
    children: [
      {
        path: "",
        pathMatch: "prefix",
        component: LibraryComponent,
        canActivate: [DwAuthGuardService],
        data: {
          dwRouteData: {
            dwAuthId: 'library',
          }
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
