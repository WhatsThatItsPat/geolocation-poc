import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';

interface Coords {
  latitude: number | null;
  longitude: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private coordsSubject: BehaviorSubject<Coords> = new BehaviorSubject({
    latitude: null,
    longitude: null
  });
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public coords$: Observable<Coords> = this.coordsSubject;

  constructor() {
    this.start();
  }

  async start() {

    const watchOptions = {
      // enableHighAccuracy: false,
      // timeout: 10000,
      // maximumAge: 0
    };

    const watchId = await Geolocation.watchPosition(
      watchOptions,
      (position, error) => {
        console.log({position, error});

        const { coords: {latitude, longitude } } = position;

        this.coordsSubject.next({latitude, longitude});
      }
    );

    console.log({ watchId });
  }
}
