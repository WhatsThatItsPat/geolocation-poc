import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';

export interface LocationInfo {
  latitude: number | null;
  longitude: number | null;
  watchId: string | null;
  permissionState: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private locationInfoSubject: BehaviorSubject<LocationInfo> = new BehaviorSubject({
    latitude: null,
    longitude: null,
    watchId: null,
    permissionState: null
  });
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public locationInfo$: Observable<LocationInfo> = this.locationInfoSubject;

  constructor() {
    this.checkAndUpdatePermissions();
  }

  updateLocationInfoSubject(newData: Partial<LocationInfo>) {
    this.locationInfoSubject.next({
      ...this.locationInfoSubject.value,
      ...newData
    });
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

        if (!!position) {
          const { coords: {latitude, longitude } } = position;
          this.updateLocationInfoSubject({latitude, longitude});
        }

        // Whether we get a position or error, we save the permission.
        this.checkAndUpdatePermissions();

      }
    );

    this.updateLocationInfoSubject({watchId});

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

  private async checkAndUpdatePermissions() {
    const { location: permissionState } = await Geolocation.checkPermissions();

    if (this.locationInfoSubject.value.permissionState !== permissionState) {
      this.updateLocationInfoSubject({permissionState});
    }

  }
}
