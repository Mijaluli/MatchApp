import { Component, OnInit } from '@angular/core';
import { Matchmaker } from '../matchmaker.model';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatchmakersService } from '../matchmakers.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { mimeType } from 'src/app/mime-type.validator';
import { error } from '@angular/compiler/src/util';
import { ViewChild } from '@angular/core';


//import { mimeType } from 'src/app/candidates/candidate-create/candidate-create/mime-type.validator';
//import { mimeTypee } from '\src\app\matchmakers\matchmaker-create';
//import { mimeType } from 'src/app/candidates/candidate-create/candidate-create/mime-type.validator';

@Component({
  selector: 'app-matchmaker-create',
  templateUrl: './matchmaker-create.component.html',
  styleUrls: ['./matchmaker-create.component.css']
})
export class MatchmakerCreateComponent implements OnInit {
 // @ViewChild('f') form:FormGroup; //feth reference of form using ViewChild property
  
  enteredTitle = '';
  enteredContent = '';
  //@Output() candidateCreated = new EventEmitter<Candidate>();
  // we delete @output and do :
  matchmaker: Matchmaker;
 //cities: City[];
  isLoading = false;
  form:  FormGroup;
  imagePreview: string;
  private mode = "create";
  public matchmakerId: string;
  //filteredOptions: Observable<City[]>;
   storedFilter;

   //@Input()
   //control:FormControl;

  constructor(
  
       public matchmakerService: MatchmakersService
    ,  public route: ActivatedRoute
    ){}
    ngOnInit() {
    // this will create a new property candidatesService in this class]
    //cities: City[]=[];
    



    this.form= new FormGroup({
      
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, { validators: [Validators.required] }),
      cityName: new FormControl("default"),
      firstName:new FormControl(null ),
      lastName:new FormControl(null ),
      mainPhone:new FormControl(null ),
      secondPhone:new FormControl(null ),
      ageRange: new FormControl(null ),
      age:new FormControl(null ),
      academy:new FormControl(null ),
      remark: new FormControl(null ),
      areaToSale:new FormControl(null ),//area rev to work
         
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
      //,  cityName : new FormControl()//(null, { validators: [ Validators.minLength(3)]})
    });
 
 //   cityName: new FormControl( ['', [Validators.required]]);

    
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has("candidateId")) {
          this.mode = "edit";
          this.matchmakerId = paramMap.get("matchmakerId");
          this.isLoading = true;
          this.matchmakerService.getMatchmaker(this.matchmakerId).subscribe(matchmakerData => {
            this.isLoading = false;
            this.matchmaker = {
              id: matchmakerData._id,
              title: matchmakerData.title,
              content: matchmakerData.content,
              imagePath: matchmakerData.imagePath,
              cityName:matchmakerData.cityName,
              firstName:matchmakerData.firstName,
               lastName:matchmakerData.lastName,
               mainPhone:matchmakerData.mainPhone,
               secondPhone:matchmakerData.secondPhone,
               ageRange: matchmakerData.ageRange,
              age:matchmakerData.age,
               academy:matchmakerData.academy,
                remark: matchmakerData.remark,
               areaToSale:matchmakerData.areaToSale//area rev to work
            };
            this.form.setValue({
              title: this.matchmaker.title,
              content: this.matchmaker.content,
              image: this.matchmaker.imagePath,
              cityName:this.matchmaker.cityName,
              firstName:this.matchmaker.firstName,
              lastName:this.matchmaker.lastName,
              mainPhone:this.matchmaker.mainPhone,
              secondPhone: this.matchmaker.secondPhone,
              ageRange: this.matchmaker.ageRange,
              age:this.matchmaker.age,
              academy:this.matchmaker.academy,
              remark: this.matchmaker.remark,
              areaToSale:this.matchmaker.areaToSale
            });
          });
        } else {
          this.mode = "create";
          this.matchmakerId = null;
          console.log(this.matchmakerId);
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
  
  

    onSaveMatchmaker() {
      if (this.form.invalid) {
        return;
      }
      //////////////////////
     

      this.isLoading = true;
      if (this.mode === "create") {
        this.matchmakerService.addMatchmaker(
          this.form.value.title,
          this.form.value.content,
          this.form.value.image,
          this.form.value.cityName,
          this.form.value.firstName,
          this.form.value.lastName,
          this.form.value.mainPhone,
          this.form.value.secondPhone,
          this.form.value.ageRange,
          this.form.value.age,
          this.form.value.academy,
          this.form.value.remark,
          this.form.value.areaToSale
        );
      } else {
        this.matchmakerService.updateMatchmaker(
          this.matchmakerId,
          this.form.value.title,
          this.form.value.content,
          this.form.value.image,
          this.form.value.cityName,
          this.form.value.firstName,
          this.form.value.lastName,
          this.form.value.mainPhone,
          this.form.value.secondPhone,
          this.form.value.ageRange,
          this.form.value.age,
          this.form.value.academy,
          this.form.value.remark,
          this.form.value.areaToSale
        );
      }
      //this.form.reset(value = {}, options = {}) { this._forEachChild((/** * @param {?} control * @param {?} name * @return {?} */ (control, name) => {…});
     // this.form.reset(this.form.value);
     this.form.reset();
      //JSON.stringify(Error, Object.getOwnPropertyNames(error))
      console.log(this.form.value,this.form.controls );
    }

}

