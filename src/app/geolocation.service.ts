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

  constructor() {}

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

        this.updateLocationInfoSubject({latitude, longitude});
      }
      );

    this.updateLocationInfoSubject({watchId});

  }

  updateLocationInfoSubject(newData: Partial<LocationInfo>) {
    this.locationInfoSubject.next({
      ...this.locationInfoSubject.value,
      ...newData
    });
  }


  async stop() {
    if (!!this.locationInfoSubject.value.watchId) {
      await Geolocation.clearWatch({
        id: this.locationInfoSubject.value.watchId
      });

      this.updateLocationInfoSubject({
        latitude: null,
        longitude: null,
        watchId: null
      });
    }
  }
}
