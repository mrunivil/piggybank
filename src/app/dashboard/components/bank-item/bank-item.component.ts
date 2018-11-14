import { Component, OnInit, Input } from '@angular/core';
import { Bank } from 'src/app/models/bank';

@Component({
  selector: 'app-bank-item',
  templateUrl: './bank-item.component.html',
  styleUrls: ['./bank-item.component.scss']
})
export class BankItemComponent implements OnInit {

  @Input() item: Bank;

  constructor() { }

  ngOnInit() {
  }

}
