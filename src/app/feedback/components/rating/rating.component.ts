import { Component, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

    @Output() rating = new EventEmitter();

    stars: Array<Star> = [];

    constructor() {
        for (let i = 1; i < 6; i++) {
            this.stars.push(new Star(i));
        }
    }

    rate(star: Star) {
        this.stars.forEach((s) => {
            if (s.value <= star.value) {
                s.class = 'rated';
            } else {
                s.class = s.class.replace('rated', '');
            }
        });
        this.rating.next(star.value);
    }
}

export class Star {
    value: number;
    class: string;
    constructor(value: number) {
        this.value = value;
        this.class = '';
    }
}