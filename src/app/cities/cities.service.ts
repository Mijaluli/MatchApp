import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import { City } from './city.model';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable({providedIn: "root"}) // this will add this service to the providers array in app.module.ts
export class CitiesService {

private cities: City[] = [];
private citiesUpdated = new Subject<{ cities: City[]; cityCount: number }>();



constructor(private http: HttpClient ,private router: Router) {
  let cities =this.getCities(1,2);
}

getCities(citiesPerPage: number, currentPage: number) { 
  const queryParams = `?pagesize=${citiesPerPage}&page=${currentPage}`; 
  this.http.get<{message: string; cities:
any,maxCities:number}>('http://localhost:3000/api/cities'+ queryParams)
.pipe(
    map(cityData => {
      return {
        cities: cityData.cities.map(city => {
          return {
          
            id: city._id,
            cityName: city.cityName
           // address:candidate.address
          };
        }),
      /*  locations: noteData.locations.map(note => {
          return {
            city: note._id,
            count: note.count
          };
        }),*/
        maxCities: cityData.maxCities
      };
    })
  )
  .subscribe(transformedCityData => {
    this.cities = transformedCityData.cities;
    //this.locations = transformedNoteData.locations;
    this.citiesUpdated.next({
      cities: [...this.cities],
      //locations: [...this.locations],
      cityCount: transformedCityData.maxCities
    });
  });
}

/*
getAllCities() { 
  //const queryParams = `?pagesize=${citiesPerPage}&page=${currentPage}`; 
  this.http.get<{message: string; cities:
any,maxCities:number}>('http://localhost:3000/api/cities')
.pipe(
    map(cityData => {
      return {
        cities: cityData.cities.map(city => {
          return {
          
            id: city._id,
            cityName: city.cityName
           // address:candidate.address
          };
        }),
      
        maxCities: cityData.maxCities
      };
    })
  )
  .subscribe(transformedCityData => {
    this.cities = transformedCityData.cities;
    //this.locations = transformedNoteData.locations;
    this.citiesUpdated.next({
      cities: [...this.cities],
      //locations: [...this.locations],
      cityCount: transformedCityData.maxCities
    });
  });
}
*/


getCityUpdateListener() {
return this.citiesUpdated.asObservable();
}
getCity(id: string) {
    return this.http.get<{
      _id: string;
      cityName: string;
      
    }>("http://localhost:3000/api/cities/" + id);
  }

addCity(cityName: string/*,address:string*/) {
  const cityData = new FormData();
  cityData.append("cityName", cityName);
  //console.log("addCity");
  this.http
    .post<{ message: string; city: City }>(
      "http://localhost:3000/api/cities",
      cityData
    )
    .subscribe(responseData => {
      this.router.navigate(["/"]);
    });
}

updateCity(id: string, cityName: string/*imagePath:string,address*/) {
    let cityData: City | FormData;
    if (typeof cityName === "object") {
        cityData = new FormData();
        cityData.append("id", id);
        cityData.append("cityName", cityName);
      
    } else {
      
        cityData = {
        id: id,
        cityName: cityName
      };
   }
       this.http
      .put("http://localhost:3000/api/cities/" + id, cityData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteCity(cityId: string) {
    return this.http
      .delete("http://localhost:3000/api/cities/" + cityId);
  }

}   