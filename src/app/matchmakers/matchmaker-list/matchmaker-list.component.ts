import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchmakersService } from '../matchmakers.service';
import { Matchmaker } from '../matchmaker.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-matchmaker-list',
  templateUrl: './matchmaker-list.component.html',
  styleUrls: ['./matchmaker-list.component.css']
})
export class MatchmakerListComponent implements OnInit,OnDestroy {

   //@Input() candidates: Candidate[] = [];// first - in order to import auto
  // הקלט הוא מה db 
// במקום @input נשתמש ב t, OnInit, OnDestroy
isLoading = false;
matchmakersPerPage = 2;
 currentPage = 1;
 pageSizeOptions = [1, 2, 5, 10];

totalMatchmakers = 0;
matchmakers: Matchmaker[] = [];
private matchmakersSub: Subscription;

constructor(public matchmakersService: MatchmakersService) {
// this will create a new property notesService in this class]
}
ngOnInit() {

 this.isLoading = true;
 
 this.matchmakersService.getMatchmakers(this.matchmakersPerPage, this.currentPage);
   this.matchmakersSub = this.matchmakersService
     .getMatchmakerUpdateListener()
     .subscribe((matchmakerData: { matchmakers: Matchmaker[]/*, locations: Advertisement[]*/, matchmakerCount: number }) => {
       this.totalMatchmakers = matchmakerData.matchmakerCount;
       this.isLoading = false;
       //this.filteradvertisements = noteData.advertisements;
       //this.locations = noteData.locations;
       this.matchmakers = matchmakerData.matchmakers;
     });
   
}
onChangedPage(pageData: PageEvent) {
 this.isLoading = true;
 this.currentPage = pageData.pageIndex + 1;
 this.matchmakersPerPage = pageData.pageSize;
 this.matchmakersService.getMatchmakers(this.matchmakersPerPage, this.currentPage);
}

onDelete(matchmakersId: string) {
//  this.isLoading = true;
 this.matchmakersService.deleteMatchmaker(matchmakersId).subscribe(() => {
   this.matchmakersService.getMatchmakers(this.matchmakersPerPage, this.currentPage);
 });
}

ngOnDestroy(){
this.matchmakersSub.unsubscribe();
}

}
