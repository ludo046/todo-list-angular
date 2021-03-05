
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
secondesObs: Subscription
secondes: number;
  constructor() { }

  ngOnInit(): void {
const numberPair = interval(1000)

this.secondesObs = numberPair.subscribe(
  (value: number) => {
    this.secondes = value

  }
);
}
ngOnDestroy(){
  this.secondesObs.unsubscribe();
}
}
