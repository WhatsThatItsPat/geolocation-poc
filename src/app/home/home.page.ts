import { Component } from '@angular/core';
import { tap, shareReplay } from 'rxjs/operators';
import { GeolocationService } from '../geolocation.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  locationInfo$ = this.geolocationService.locationInfo$.pipe(
    tap(locationInfo => {
      console.log(`locationInfo`, locationInfo);
    }),
    shareReplay(),
  );;

  constructor(
    private geolocationService: GeolocationService
  ) {}

  start() {
    this.geolocationService.start();
  }

  stop() {
    this.geolocationService.stop();
  }

}
