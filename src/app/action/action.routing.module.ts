import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionComponent } from './components/action/action.component';

const routes: Routes = [
    {
        path: ':type',
        component: ActionComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ActionRoutingModule { }