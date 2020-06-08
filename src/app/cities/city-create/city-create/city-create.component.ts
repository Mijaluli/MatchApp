import { Component, OnInit } from '@angular/core';
import { City } from '../../city.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CitiesService } from '../../cities.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.css']
})
export class CityCreateComponent implements OnInit {






  enteredCityName = '';

  //@Output() candidateCreated = new EventEmitter<Candidate>();
  // we delete @output and do :
  city: City;
  isLoading = false;
  form:  FormGroup;
  private mode = "create";
  private cityId: string;


  constructor(
       public citiesService: CitiesService
    ,  public route: ActivatedRoute
    ){}
    ngOnInit() {
    // this will create a new property candidatesService in this class]
    this.form = 
      new FormGroup({
        
        cityName: new FormControl(null, { validators: [/*Validators.required*/, Validators.minLength(3)]})
      
     
    });
    
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has("cityId")) {
          this.mode = "edit";
          this.cityId = paramMap.get("cityId");
         this.isLoading = true;
          this.citiesService.getCity(this.cityId).subscribe(cityData => {
           this.isLoading = false;
            this.city = {
              id: cityData._id,
              cityName: cityData.cityName
            };
            this.form.setValue({
              title: this.city.cityName
             // address: this.candidate.address
            });
          });
        } else {
          this.mode = "create";
          this.cityId = null;
        }
      });
    }
  
   
  
    onSaveCity() {
     if (this.form.invalid) {
        return;
      }
      this.isLoading = true;
      if (this.mode === "create") {
        this.citiesService.addCity(
          this.form.value.cityName
        );
      } else {
        this.citiesService.updateCity(
          this.cityId,
          this.form.value.cityName
        );
      }
      this.form.reset();
    }




}
