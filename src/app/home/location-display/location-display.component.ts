import { Component, Input, OnInit } from '@angular/core';
import { LocationInfo } from 'src/app/geolocation.service';

@Component({
  selector: 'app-location-display',
  templateUrl: './location-display.component.html',
  styleUrls: ['./location-display.component.scss'],
})
export class LocationDisplayComponent implements OnInit {

  @Input() locationInfo: LocationInfo;

  constructor() { }

  ngOnInit() {}

}
