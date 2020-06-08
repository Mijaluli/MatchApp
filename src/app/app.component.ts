import { Component } from '@angular/core';
import { CandidatesService } from './candidates/candidates.service';
import { CitiesService } from './cities/cities.service';
import { CityComponent } from './cities/city/city.component';
import { RestApiService } from './rest-api.service';
import { DataService } from './data.service';
import { AuthGuardService } from './auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 // providers:[CandidatesService,CitiesService,
  //  RestApiService, DataService, AuthGuardService/*CityComponent*/]
})
export class AppComponent {

  storedFilter = [];
  onFilterChanged(filter) {
  this.storedFilter.push(filter);
  }
  
  constructor(public router: Router, public data: DataService) {
    //this.data.cartItems = this.data.getCart().length;
    this.data.getProfile();
  }
 // storedCandidates: Candidate[] = [];

/*onCandidateAdded(candidate) {
this.storedCandidates.push(candidate);
}  after add service we deleted it  */

}
