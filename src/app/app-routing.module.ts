import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CandidateCreateComponent } from './candidates/candidate-create/candidate-create/candidate-create.component';
import { CandidateListComponent } from './candidates/candidate-list/candidate-list/candidate-list.component';
import { CityCreateComponent } from './cities/city-create/city-create/city-create.component';
import { CityListComponent } from './cities/city-list/city-list/city-list.component';
import { MatchmakerCreateComponent } from './matchmakers/matchmaker-create/matchmaker-create.component';
import { MatchmakerListComponent } from './matchmakers/matchmaker-list/matchmaker-list.component';
import { HomeComponent } from './home/home.component';
import { CandidateStatisticsComponent } from './candidates/candidate-statistics/candidate-statistics.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  

  { path: 'statistic', component: CandidateStatisticsComponent },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'citylist', component: CityListComponent },
  { path: 'candidate', component: CandidateListComponent },
  { path: 'create', component: CandidateCreateComponent },
  { path: 'createMatch', component: MatchmakerCreateComponent },
  { path: 'edit/:candidateId', component: CandidateCreateComponent },
  { path: 'listMatch', component: MatchmakerListComponent },
  { path: 'edit/:matchmakerId', component: MatchmakerCreateComponent },
  //{ path: 'createCity', component: CityCreateComponent },
  //{ path: 'edit/:cityId', component: CityCreateComponent },
 // { path: 'city', component: CityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  /// , CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
