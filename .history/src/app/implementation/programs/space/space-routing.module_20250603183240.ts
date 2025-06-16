import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'library',
    loadChildren: () =>
      import('./library/library.module').then((m) => m.LibraryModule),
  },
  {
    path: 'widget',
    loadChildren: () =>
      import('./widget/widget.module').then((m) => m.WidgetModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaceRoutingModule {}
