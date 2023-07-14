import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-pages',
  templateUrl: './by-country-pages.component.html',
  styles: [
  ]
})
export class ByCountryPagesComponent implements OnInit {
  public isLoading : boolean = false;
  public countries : Country[] = []
  public initialValue : string = '' 

  constructor( private countrieService : CountriesService) {

  }
  ngOnInit(): void {
    this.countries = this.countrieService.chacheStore.byCountries.countries
    this.initialValue = this.countrieService.chacheStore.byCountries.term
  }

  searchByCountry( term : string) : void {
    this.isLoading = true
    this.countrieService.searchCountry(term).subscribe( countries => {
      this.countries = countries;
      this.isLoading = false
    })
  }
}
