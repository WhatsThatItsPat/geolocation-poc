import { Component } from '@angular/core';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  locationInfo$ = this.geolocationService.locationInfo$;

  constructor(
    private geolocationService: GeolocationService
  ) {}

}
