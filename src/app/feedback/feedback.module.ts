import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { HeaderComponent } from './components/header/header.component';
import { RatingComponent } from './components/rating/rating.component';
import { FeedbackRoutingModule } from './feedback.routing.module';
import { FeedbackService } from './services/feedback.service';
import { FirebaseFeedbackService } from './services/firebase/feedback.service';
import { LocalFeedbackService } from './services/local/feedback.service';
import { FeedbackState } from './state/feedback.state';


@NgModule({
    declarations: [
        FeedbackComponent,
        HeaderComponent,
        RatingComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgxsModule.forFeature([FeedbackState]),
        FeedbackRoutingModule
    ],
    providers: [
        {
            provide: FeedbackService, useClass: environment.service === 'local' ? LocalFeedbackService : FirebaseFeedbackService
        }
    ]
})
export class FeedbackModule { }
