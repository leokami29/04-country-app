import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-pages',
  templateUrl: './by-region-pages.component.html',
  styles: [
  ]
})
export class ByRegionPagesComponent {
  public countries : Country[] = []

  constructor( private countrieService : CountriesService) {

  }

  seacrByRegion( region : string) : void {
    this.countrieService.searchRegion(region).subscribe( countries => {
      this.countries = countries;
    })
  }
}
