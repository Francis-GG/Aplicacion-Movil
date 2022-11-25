import { Component, OnInit } from '@angular/core';
import { ConversorService } from 'src/app/services/conversor.service';


@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.page.html',
  styleUrls: ['./conversor.page.scss'],
})

export class ConversorPage implements OnInit {

  constructor(private conversorService: ConversorService) { }

  results = null;

  ngOnInit() {
    this.conversorService.getDivisasData().subscribe((res) => {
      this.results = res;
     });
  }
   
  
  
   convertirDivisas(){
   let montoInicial = (<HTMLInputElement>document.getElementById('montoInicial')).value;
   let divisaInicial = (<HTMLInputElement>document.getElementById('divisaInicial')).value;
   let divisaFinal = (<HTMLInputElement>document.getElementById('divisaFinal')).value;
   let montoFinalHTML = document.getElementById('montoFinal');

   switch(divisaInicial){
      case 'clp':
        switch(divisaFinal){
          case 'clp':
            montoFinalHTML.innerHTML = montoInicial + " Pesos Chilenos";
            break;
          case 'usd':
            montoFinalHTML.innerHTML = (parseInt(montoInicial) / this.results.dolar.valor).toFixed(2) + " Dólares";
            break;
          case 'euro':
            montoFinalHTML.innerHTML = (parseInt(montoInicial) / this.results.euro.valor).toFixed(2) + " Euros";
            break;
          case 'btc':
            montoFinalHTML.innerHTML = (parseInt(montoInicial) / (this.results.bitcoin.valor * this.results.dolar.valor)).toFixed(10) + " Bitcoins";
            break;
        }
        break;
      
      case 'usd':
        switch(divisaFinal){
          case 'clp':
            montoFinalHTML.innerHTML = (parseInt(montoInicial) * this.results.dolar.valor).toFixed(2) + " Pesos Chilenos";
            break;
          case 'usd':
            montoFinalHTML.innerHTML = montoInicial + " Dólares";
            break;
          case 'euro':
            montoFinalHTML.innerHTML = (parseInt(montoInicial) * this.results.dolar.valor / this.results.euro.valor).toFixed(2) + " Euros";
            break;
          case 'btc':
            montoFinalHTML.innerHTML = (parseInt(montoInicial) / this.results.bitcoin.valor).toFixed(10) + " Bitcoins";
            break;
        }
      break;
      
      case 'euro':
        switch(divisaFinal){
          case 'clp':
            montoFinalHTML.innerHTML = (parseInt(montoInicial) * this.results.euro.valor).toFixed(2) + " Pesos Chilenos";
            break;
          case 'usd':
            montoFinalHTML.innerHTML = (parseInt(montoInicial) * this.results.euro.valor / this.results.dolar.valor).toFixed(2) + " Dólares";
            break;
          case 'euro':
            montoFinalHTML.innerHTML = montoInicial + " Euros";
            break;
          case 'btc':
            montoFinalHTML.innerHTML = (parseInt(montoInicial) * this.results.euro.valor / (this.results.bitcoin.valor * this.results.dolar.valor)).toFixed(10) + " Bitcoins";
            break;
    } 
    break;

    case 'btc':
      switch(divisaFinal){
        case 'clp':
          montoFinalHTML.innerHTML = (parseInt(montoInicial) * this.results.bitcoin.valor * this.results.dolar.valor).toFixed(2) + " Pesos Chilenos";
          break;
        case 'usd':
          montoFinalHTML.innerHTML = (parseInt(montoInicial) * this.results.bitcoin.valor).toFixed(2) + " Dólares";
          break;
        case 'euro':
          montoFinalHTML.innerHTML = (parseInt(montoInicial) * this.results.bitcoin.valor * this.results.dolar.valor / this.results.euro.valor).toFixed(2) + " Euros";
          break;
        case 'btc':
          montoFinalHTML.innerHTML = montoInicial + " Bitcoins";
   }
    break;
    }
  }
}