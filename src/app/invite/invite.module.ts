import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteComponent } from './components/invite/invite.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [InviteComponent],
    imports: [
        CommonModule,

        //testing
        HttpClientModule,

        RouterModule.forChild([
            {
                path: '',
                component: InviteComponent
            }

        ])
    ]
})
export class InviteModule { }