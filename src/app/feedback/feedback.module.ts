import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeedbackRoutingModule } from './feedback.routing.module';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { HeaderComponent } from './components/header/header.component';
import { FeedbackState } from './state/feedback.state';
import { NgxsModule } from '@ngxs/store';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from './services/feedback.service';
import { environment } from 'src/environments/environment';
import { LocalFeedbackService } from './services/local/feedback.service';
import { FirebaseFeedbackService } from './services/firebase/feedback.service';
import { RatingComponent } from './components/rating/rating.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


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
