import '@angular/compiler';
import { enableProdMode } from '@angular/core';  
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';  
 

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import {  ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';
//import { MatInputModule, MatCardModule, MatButtonModule } from '@angular/material';
import {} from '@angular/material/input';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
//import {MatFormField} from '@angular/material/form-field';
//import {MatToolbar} from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { CandidateCreateComponent } from './candidates/candidate-create/candidate-create/candidate-create.component';
import { HeaderComponent } from './header/header/header.component';
import { CandidateListComponent } from './candidates/candidate-list/candidate-list/candidate-list.component';
import {HttpClientModule} from "@angular/common/http"
import { MatchmakerCreateComponent } from './matchmakers/matchmaker-create/matchmaker-create.component';
import { MatchmakerListComponent } from './matchmakers/matchmaker-list/matchmaker-list.component';
import { HomeComponent } from  './home/home.component';
import { CandidateStatisticsComponent } from './candidates/candidate-statistics/candidate-statistics.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component'
import { MessageComponent } from './message/message.component';

import { AppRoutingModule } from "./app-routing.module";
import { CityCreateComponent } from './cities/city-create/city-create/city-create.component';
import { CityListComponent } from './cities/city-list/city-list/city-list.component';
import { CityComponent } from './cities/city/city.component';
import { AutocompleteAutoActiveFirstOptionExampleComponent } from './autocomplete-auto-active-first-option-example/autocomplete-auto-active-first-option-example.component';
import { MatSelectModule } from '@angular/material/select';
import { SectorComponent } from './sector/sector.component';
import { HairColorComponent } from './hair-color/hair-color.component';
import { EyeColorComponent } from './eye-color/eye-color.component';
import { SkinColorComponent } from './skin-color/skin-color.component';
import { AreaComponent } from './area/area.component';
import { AcademyComponent } from './academy/academy.component';
import { AgeRangeComponent } from './age-range/age-range.component';
import { FemaleComponent } from './female/female.component';
import { CommunalSourceComponent } from './communal-source/communal-source.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from './rest-api.service';
import { DataService } from './data.service';
import { AuthGuardService } from './auth-guard.service';
import { MapComponent } from './candidates/map/map.component';
import { SocketComponent } from './socket/socket.component';


//import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    AppComponent,
  
    CandidateCreateComponent,
    HeaderComponent,
    CandidateListComponent,
    CityCreateComponent,
    CityListComponent,
    CityComponent,
      AutocompleteAutoActiveFirstOptionExampleComponent,
      MatchmakerCreateComponent,
      MatchmakerListComponent,
      SectorComponent,
      HairColorComponent,
      EyeColorComponent,
      SkinColorComponent,
      AreaComponent,
      AcademyComponent,
      AgeRangeComponent,
      FemaleComponent,
      CommunalSourceComponent,
      HomeComponent,
      CandidateStatisticsComponent,
      LoginComponent,
      RegistrationComponent,
      MessageComponent,
      MapComponent,
      SocketComponent
      
    
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    //MatToolbar,
    MatExpansionModule,
    HttpClientModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
	  MatSelectModule,
    MatFormFieldModule,
    NgbModule,
    
    //MatFormField
    
  ],
  
  providers: [RestApiService, DataService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
