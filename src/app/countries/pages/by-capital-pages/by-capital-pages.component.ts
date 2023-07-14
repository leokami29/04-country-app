import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-pages',
  templateUrl: './by-capital-pages.component.html',
  styles: [
  ]
})
export class ByCapitalPagesComponent implements OnInit {

  public countries : Country[] = [];
  public isLoading : boolean = false;
  public initialValue : string = '' 

  constructor( private countrieService : CountriesService) {

  }

  ngOnInit(): void {
    this.countries = this.countrieService.chacheStore.byCapital.countries
    this.initialValue = this.countrieService.chacheStore.byCapital.term
  }

  searchByCapital( term : string) : void {

    this.isLoading = true
    this.countrieService.searchCapital(term).subscribe( countries => {
      this.isLoading = false
      this.countries = countries;
    })
  }
}
