import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of, map, tap } from 'rxjs';

import { Country } from '../interfaces/country';
import { CahceStore } from '../interfaces/cache-store.interfaces';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiURL: string = 'https://restcountries.com/v3.1';

  public chacheStore: CahceStore = {
    byCapital: {
      term: '',
      countries: [],
    },
    byCountries: {
      term: '',
      countries: [],
    },
    byRegion: {
      region: '',
      countries: [],
    },
  };

  constructor(private http: HttpClient) {
    this.loadToLocalStorage()
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.chacheStore));
  }

  private loadToLocalStorage() {
    if(!localStorage.getItem('cacheStore')) return

    this.chacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }

  private geCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiURL}/alpha/${code}`;
    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => {
        return of(null);
      })
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/capital/${term}`;
    return this.geCountriesRequest(url).pipe(
      tap((countries) => (this.chacheStore.byCapital = { term, countries })),
      tap( () => this.saveToLocalStorage()),
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/name/${term}`;
    return this.geCountriesRequest(url).pipe(
      tap((countries) => (this.chacheStore.byCountries = { term, countries })),
      tap( () => this.saveToLocalStorage()),
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    // TODO
    const url = `${this.apiURL}/region/${region}`;
    return this.geCountriesRequest(url).pipe(
      tap((countries) => (this.chacheStore.byRegion = { region, countries })),
      tap( () => this.saveToLocalStorage()),
    );
  }
}
