import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';

export interface LocationInfo {
  latitude: number | null;
  longitude: number | null;
  watchId: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private locationInfoSubject: BehaviorSubject<LocationInfo> = new BehaviorSubject({
    latitude: null,
    longitude: null,
    watchId: null
  });
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public locationInfo$: Observable<LocationInfo> = this.locationInfoSubject;

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

        // this.locationInfoSubject.next({latitude, longitude});
        this.updateLocationInfoSubject({latitude, longitude});
      }
      );

    // console.log({ watchId });
    this.updateLocationInfoSubject({watchId});

  }

  updateLocationInfoSubject(newData: Partial<LocationInfo>) {
    this.locationInfoSubject.next({
      ...this.locationInfoSubject.value,
      ...newData
    });
  }
}
