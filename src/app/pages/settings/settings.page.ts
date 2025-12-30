import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';

import { SettingsService, Measurement } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonRadioGroup,
    IonRadio,
    IonBackButton,
    IonButtons,
  ],
})
export class SettingsPage {
  measurement: Measurement = 'metric';

  constructor(private settings: SettingsService) {}

  ionViewWillEnter() {
    this.measurement = this.settings.getMeasurement();
  }

  onMeasurementChange(value: Measurement) {
    this.measurement = value;
    this.settings.setMeasurement(value);
  }
}
