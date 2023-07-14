import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-pages',
  templateUrl: './by-region-pages.component.html',
  styles: [
  ]
})
export class ByRegionPagesComponent implements OnInit {

  public isLoading : boolean = false;
  public countries : Country[] = [];
  public regions : Region[] = ['Africa','Americas','Asia','Europe','Oceania'];
  public selectedRegion? : Region;
  public initialValue : string = '' 

  constructor( private countrieService : CountriesService) {

  }

  ngOnInit(): void {
    this.regions = this.countrieService.chacheStore.byRegion.region
    this.initialValue = this.countrieService.chacheStore.byRegion.countries
  }

  searchByRegion( region : Region) : void {
    this.isLoading = true
    this.selectedRegion = region
    this.countrieService.searchRegion(region)
    .subscribe( countries => {
      this.countries = countries;
      this.isLoading = false
    })
  }
}
