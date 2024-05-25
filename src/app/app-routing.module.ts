import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/setup/setup.module').then(m => m.SetupModule) },
  { path: 'deck', loadChildren: () => import('./pages/deck/deck.module').then(m => m.DeckModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
