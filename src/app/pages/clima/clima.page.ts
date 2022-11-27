import { Component, OnInit } from '@angular/core';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
})
export class ClimaPage implements OnInit {

  constructor(private climaService: ClimaService) { }

  results = null;
  latitude = 0;
  longitude = 0;

  ngOnInit() {
     navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log(this.latitude);
      console.log(this.longitude);
      this.climaService.getClimaData(this.latitude, this.longitude).subscribe((res) => {
        this.results = res;
       });
    });
  }

  funcionClima(){
    let ciudad = document.getElementById('ciudad');
    let temperatura = document.getElementById('temperatura');
    let humedad = document.getElementById('humedad');
    let presion = document.getElementById('presion');
    let viento = document.getElementById('viento');
    let imagenClima = document.getElementById('imagenClima') as HTMLImageElement;

    ciudad.innerHTML = "Ciudad: " + this.results.name;
    temperatura.innerHTML = "Temperatura: " + this.results.main.temp + "°C";
    humedad.innerHTML = "Humedad: " + this.results.main.humidity + "%";
    presion.innerHTML = "Presión: " + this.results.main.pressure + " hPa";
    viento.innerHTML = "Viento: " + this.results.wind.speed + " m/s";
    imagenClima.src = "http://openweathermap.org/img/wn/" + this.results.weather[0].icon + "@2x.png";


    console.log(this.results);
  }



}
