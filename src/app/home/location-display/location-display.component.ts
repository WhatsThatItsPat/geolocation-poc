import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-display',
  templateUrl: './location-display.component.html',
  styleUrls: ['./location-display.component.scss'],
})
export class LocationDisplayComponent implements OnInit {

  @Input() coords;

  constructor() { }

  ngOnInit() {}

}
