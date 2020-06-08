import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Candidate } from '../candidate.model';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesService } from '../candidates.service';

@Component({
  selector: 'app-candidate-statistics',
  templateUrl: './candidate-statistics.component.html',
  styleUrls: ['./candidate-statistics.component.css']
})
export class CandidateStatisticsComponent implements OnInit{
  counter:any;
     candidates: Candidate[] = [];
     private candidatesSub: Subscription;
     constructor(public candidatesService: CandidatesService) {
       }
     ngOnInit() {
         this.candidatesService.getCandidates(this.candidates.length, null);
         this.candidatesSub = this.candidatesService
           .getCandidateUpdateListener()
           .subscribe((candidateData: { candidates: Candidate[], candidateCount: number }) => {
             this.candidates = candidateData.candidates;
             console.log(this.candidates.length);
             this.counter=this.candidates.reduce((acc,eachData) => {
          //statistic
          //area
              if (eachData.area === 'מרכז') {
                acc.deployed ++}
            if (eachData.area === 'דרום') {
                acc.failed ++}
           return acc
          }, {deployed: 0, failed: 0});
          console.log(this.counter);
           console.log(this.candidates);
           (<HTMLInputElement>document.getElementById("center")).value = this.counter.deployed.toString();
          (<HTMLInputElement>document.getElementById("south")).value = this.counter.failed.toString();
          this.counter=this.candidates.reduce((acc,eachData) => {
            if (eachData.area === 'צפון') {
               acc.deployed ++}
             return acc
          }, {deployed: 0, failed: 0});
          console.log(this.counter);
           (<HTMLInputElement>document.getElementById("north")).value = this.counter.deployed.toString();
           //age
           this.counter=this.candidates.reduce((acc,eachData) => {
            if (parseInt(eachData.age) >= 20 && parseInt(eachData.age) <= 25 ) {
                acc.deployed ++}
            if (parseInt(eachData.age) > 25 && parseInt(eachData.age) <= 30) {
                acc.failed ++}
           return acc
          }, {deployed: 0, failed: 0});
          console.log(this.counter);
          (<HTMLInputElement>document.getElementById("smallAge")).value = this.counter.deployed.toString();
          (<HTMLInputElement>document.getElementById("middleAge")).value = this.counter.failed.toString();
          this.counter=this.candidates.reduce((acc,eachData) => {
            if (parseInt(eachData.age) >= 30 && parseInt(eachData.age) <= 40 ) {
                acc.deployed ++}
                return acc
          }, {deployed: 0, failed: 0});
          console.log(this.counter);
          (<HTMLInputElement>document.getElementById("bigAge")).value = this.counter.deployed.toString();
        // acadmay
        this.counter=this.candidates.reduce((acc,eachData) => {
          if (eachData.academy ==="אקדמאי")  {
              acc.deployed ++}
              return acc
        }, {deployed: 0, failed: 0});
        console.log(this.counter);
        (<HTMLInputElement>document.getElementById("academic")).value = this.counter.deployed.toString();
      // Gender
      this.counter=this.candidates.reduce((acc,eachData) => {
      if (eachData.female === "נקבה" ) {
        acc.deployed ++}
    if (eachData.female === "זכר") {
        acc.failed ++}
   return acc
  }, {deployed: 0, failed: 0});
  console.log(this.counter);
  (<HTMLInputElement>document.getElementById("sexFemale")).value = this.counter.deployed.toString();
  (<HTMLInputElement>document.getElementById("sexMale")).value = this.counter.failed.toString();
  
        });
  }
}
 
  
