import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeedbackRoutingModule } from './feedback.routing.module';
import { FeedbackComponent } from './components/feedback/feedback.component';


@NgModule({
    declarations: [
        FeedbackComponent
    ],
    imports: [
        CommonModule,
        // NgxsModule.forFeature([DashboardState]),
        FeedbackRoutingModule
    ],
    //   providers: [
    //     {
    //       provide: DashboardService, useClass: environment.service === 'local' ? LocalDashboardService : FirebaseDashboardService
    //     }
    //   ]
})
export class FeedbackModule { }
