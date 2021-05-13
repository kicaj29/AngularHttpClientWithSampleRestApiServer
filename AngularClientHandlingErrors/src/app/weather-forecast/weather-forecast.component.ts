import { Component, OnInit } from '@angular/core';
import { WeatherForecast } from '../models/WeatherForecast';
import { WeatherForecastService } from '../services/weather-forecast.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  constructor(private svc: WeatherForecastService) { }

  ngOnInit(): void {
  }

  callRestApi(success: boolean) {
    this.svc.getWeatherForecast(success).subscribe(
      (data: WeatherForecast[]) => {
        console.log(data.length);
      }
    )
  }
}
