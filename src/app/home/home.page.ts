import { Component } from '@angular/core';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  coords$ = this.geolocationService.coords$;

  constructor(
    private geolocationService: GeolocationService
  ) {}

}
