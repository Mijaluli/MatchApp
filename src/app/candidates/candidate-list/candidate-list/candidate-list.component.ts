import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { Subscription } from 'rxjs';


import { Candidate } from '../../candidate.model';
import { CandidatesService } from '../../candidates.service';
import { RouterModule, Routes } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
//import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})

/*@NgModule({
  imports: [
      ReactiveFormsModule
      
  ],
  declarations: [ CandidateListComponent ]
})*/


export class CandidateListComponent  implements OnInit, OnDestroy {

  //@Input() candidates: Candidate[] = [];// first - in order to import auto
  // הקלט הוא מה db 
// במקום @input נשתמש ב t, OnInit, OnDestroy
isLoading = false;
 candidatesPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

totalCandidates = 0;
candidates: Candidate[] = [];
private candidatesSub: Subscription;

constructor(public candidatesService: CandidatesService) {
// this will create a new property notesService in this class]
}
ngOnInit() {

  this.isLoading = true;
  this.candidatesService.getCandidates(this.candidatesPerPage, this.currentPage);
    this.candidatesSub = this.candidatesService
      .getCandidateUpdateListener()
      .subscribe((candidateData: { candidates: Candidate[]/*, locations: Advertisement[]*/, candidateCount: number }) => {
        this.totalCandidates = candidateData.candidateCount;
        this.isLoading = false;
        //this.filteradvertisements = noteData.advertisements;
        //this.locations = noteData.locations;
        this.candidates = candidateData.candidates;
      });
    
}
onChangedPage(pageData: PageEvent) {
  this.isLoading = true;
  this.currentPage = pageData.pageIndex + 1;
  this.candidatesPerPage = pageData.pageSize;
  this.candidatesService.getCandidates(this.candidatesPerPage, this.currentPage);
}

onDelete(candidateId: string) {
//  this.isLoading = true;
  this.candidatesService.deleteCandidate(candidateId).subscribe(() => {
    this.candidatesService.getCandidates(this.candidatesPerPage, this.currentPage);
  });
}

ngOnDestroy(){
this.candidatesSub.unsubscribe();
}

}
