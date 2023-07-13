import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-pages',
  templateUrl: './by-country-pages.component.html',
  styles: [
  ]
})
export class ByCountryPagesComponent {
  public countries : Country[] = []

  constructor( private countrieService : CountriesService) {

  }

  seacrByCountry( term : string) : void {
    this.countrieService.searchCountry(term).subscribe( countries => {
      this.countries = countries;
    })
  }
}
