import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  constructor() { }
}
