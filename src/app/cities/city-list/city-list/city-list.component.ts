import { Component, OnInit, OnDestroy } from '@angular/core';
import { City } from '../../city.model';
import { Subscription } from 'rxjs';
import { CitiesService } from '../../cities.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit, OnDestroy{

  isLoading = false;
  citiesPerPage = 2;
   currentPage = 1;
   pageSizeOptions = [1, 2, 5, 10];
 
 totalCities = 0;
 cities: City[] = [];
 private citiesSub: Subscription;
 

 /*
City.find()
populate('countryName', 'name') // It will bring only name field
.exec(function(err, cities) {
})
 */
 constructor(public citiesService: CitiesService) {
 // this will create a new property notesService in this class]
 }
 ngOnInit() {
 
   this.isLoading = true;
   this.citiesService.getCities(this.citiesPerPage, this.currentPage);
     this.citiesSub = this.citiesService
       .getCityUpdateListener()
       .subscribe((cityData: { cities: City[]/*, locations: Advertisement[]*/, cityCount: number }) => {
         this.totalCities = cityData.cityCount;
         this.isLoading = false;
         //this.filteradvertisements = noteData.advertisements;
         //this.locations = noteData.locations;
         this.cities = cityData.cities;
       });
     
 }
 onChangedPage(pageData: PageEvent) {
   this.isLoading = true;
   this.currentPage = pageData.pageIndex + 1;
   this.citiesPerPage = pageData.pageSize;
   this.citiesService.getCities(this.citiesPerPage, this.currentPage);
 }
 
 onDelete(cityId: string) {
 //  this.isLoading = true;
   this.citiesService.deleteCity(cityId).subscribe(() => {
     this.citiesService.getCities(this.citiesPerPage, this.currentPage);
   });
 }
 
 ngOnDestroy(){
 this.citiesSub.unsubscribe();
 }
 
 }
 


