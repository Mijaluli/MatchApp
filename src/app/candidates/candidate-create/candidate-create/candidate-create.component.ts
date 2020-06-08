//@import '@angular/material/prebuilt-themes/indigo-pink.css';

import { Component , OnInit, /*, EventEmitter, Output*/
Input,
Output,
EventEmitter} from '@angular/core';
import { Candidate } from '../../candidate.model';
import { ReactiveFormsModule, FormsModule, ControlContainer } from '@angular/forms';
import { NgForm, FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { CandidatesService } from '../../candidates.service';
import { ActivatedRoute ,ParamMap} from '@angular/router';
import { mimeType } from '../../../mime-type.validator';
import { City } from 'src/app/cities/city.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CityComponent } from 'src/app/cities/city/city.component';
//import { mimeType } from "./mime-type.validator";
//import { citySchema } from '../models/city' ;
@Component({
  selector: 'app-candidate-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.css']
  
})
export class CandidateCreateComponent /*extends CityComponent */ implements OnInit {
  
  
  enteredTitle = '';
  enteredContent = '';
  @Output() cityChange: EventEmitter<string> = new EventEmitter<string>();
  //@Output() candidateCreated = new EventEmitter<Candidate>();
  // we delete @output and do :
  candidate: Candidate;
 //cities: City[];
  isLoading = false;
  form:  FormGroup;
  imagePreview: string;
  private mode = "create";
  public candidateId: string;
  //filteredOptions: Observable<City[]>;
   storedFilter;
  cityName="Default";
  data
   //@Input()
   //control:FormControl;

  constructor(
  
       public candidatesService: CandidatesService
    ,  public route: ActivatedRoute
    ){}
    
    OnCityChange(value){
      this.cityName=value;
    }
    
    
    ngOnInit() {
    // this will create a new property candidatesService in this class]
    //cities: City[]=[];
    
    



    this.form= new FormGroup({
      
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, { validators: [Validators.required] }),
      cityName: new FormControl(this.cityName),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      firstName:new FormControl(null),
      lastName:new FormControl(null),
      mainPhone:new FormControl(null),
      secondPhone:new FormControl(null),
      ageRange:new FormControl('20-26'),
      age:new FormControl(null),
      academy:new FormControl("אקדמאי"),
      remark:new FormControl(null),
      area:new FormControl("מרכז"),
      female:new FormControl("נקבה"),
      colorEye:new FormControl("ירוק"),
      colorHair:new FormControl("בלונדיני"),
      colorSkin:new FormControl("בהיר"),
      eda:new FormControl("מרוקאית"),

      hobies:new FormControl("ספורט"),
      street:new FormControl(null),
      sector:new FormControl("דתי לאומי")
      //,  cityName : new FormControl()//(null, { validators: [ Validators.minLength(3)]})
    });
 
 //   cityName: new FormControl( ['', [Validators.required]]);

    



 
    
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has("candidateId")) {
          this.mode = "edit";
          this.candidateId = paramMap.get("candidateId");
          this.isLoading = true;
          this.candidatesService.getCandidate(this.candidateId).subscribe(candidateData => {
            this.isLoading = false;
            this.candidate = {
              id: candidateData._id,
              title: candidateData.title,
              content: candidateData.content,
              imagePath: candidateData.imagePath,
              cityName:candidateData.cityName,
              firstName:candidateData.firstName,
              lastName:candidateData. lastName,
              mainPhone: candidateData.mainPhone,
              secondPhone: candidateData.secondPhone,
              ageRange: candidateData.ageRange,
             age:candidateData.age,
             academy:candidateData.academy,
             remark:candidateData.remark,
             area: candidateData.area,
             female:candidateData.female,
             colorEye: candidateData.colorEye,
             colorHair: candidateData.colorHair,
             colorSkin: candidateData.colorSkin,
             eda: candidateData.eda,
             hobies: candidateData.hobies,
             street:candidateData.street ,
             sector:candidateData.sector

            };
            this.form.setValue({
              title: this.candidate.title,
              content: this.candidate.content,
              image: this.candidate.imagePath,
              cityName:this.candidate.cityName,
              firstName:this.candidate.firstName,
              lastName:this.candidate. lastName,
              mainPhone: this.candidate.mainPhone,
              secondPhone: this.candidate.secondPhone,
              ageRange: this.candidate.ageRange,
              age:this.candidate.age,
              academy:this.candidate.academy,
              remark:this.candidate.remark,
              area: this.candidate.area,
              female:this.candidate.female,
               colorEye: this.candidate.colorEye,
              colorHair: this.candidate.colorHair,
              colorSkin: this.candidate.colorSkin,
              eda: this.candidate.eda,
              hobies: this.candidate.hobies,
              street:this.candidate.street ,
              sector:this.candidate.sector
            });
          });
        } else {
          this.mode = "create";
          this.candidateId = null;
          console.log(this.candidateId);
        }
        console.log("ok");
      });
    
     // module.exports = mongoose.model('City', citySchema);

     // module.import {  } from "module";('HomeCtrl', [])
   

    }
   // selectValue( newValue : any ) {
    //  console.log(newValue);
    //}
    onImagePicked(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({ image: file });
      this.form.get("image").updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result.toString();
      };
      reader.readAsDataURL(file);
    };
  
  

    onSaveCandidate() {
      if (this.form.invalid) {
        return;
      }
      //////////////////////
     

      this.isLoading = true;
      if (this.mode === "create") {
        this.candidatesService.addCandidate(
          this.form.value.title,
          this.form.value.content,
          this.form.value.image,
          this.form.value.cityName,
          this.form.value.firstName,
          this.form.value. lastName,
          this.form.value.mainPhone,
          this.form.value.secondPhone,
          this.form.value.ageRange,
          this.form.value.age,
          this.form.value.academy,
          this.form.value.remark,
          this.form.value.area,
          this.form.value.female,
          this.form.value.colorEye,
          this.form.value.colorHair,
          this.form.value.colorSkin,
          this.form.value.eda,
          this.form.value.hobies,
          this.form.value.street ,
          this.form.value.sector
         
        );
       // this.form.reset();
       
        //  this.cityChange.emit(this.cityName);
      } 
      else {
        this.candidatesService.updateCandidate(
          this.candidateId,
          this.form.value.title,
          this.form.value.content,
          this.form.value.image,
          this.form.value.cityName,
          this.form.value.firstName,
          this.form.value. lastName,
          this.form.value.mainPhone,
          this.form.value.secondPhone,
          this.form.value.ageRange,
          this.form.value.age,
          this.form.value.academy,
          this.form.value.remark,
          this.form.value.area,
          this.form.value.female,
          this.form.value.colorEye,
          this.form.value.colorHair,
          this.form.value.colorSkin,
          this.form.value.eda,
          this.form.value.hobies,
          this.form.value.street ,
          this.form.value.sector ,
        );
      }
      this.form.reset();
    }

}
