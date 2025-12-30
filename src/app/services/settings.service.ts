import { Injectable } from '@angular/core';

export type Measurement = 'metric' | 'us';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly storageKey = 'measurement';

  getMeasurement(): Measurement {
    const value = localStorage.getItem(this.storageKey);
    return value === 'us' ? 'us' : 'metric';
  }

  setMeasurement(value: Measurement) {
    localStorage.setItem(this.storageKey, value);
  }
}
