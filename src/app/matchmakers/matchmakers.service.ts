import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import { Matchmaker } from '../matchmakers/matchmaker.model';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable({providedIn: "root"}) // this will add this service to the providers array in app.module.ts
export class MatchmakersService {
  private matchmakers: Matchmaker [] = [];

private matchmakersUpdated = new Subject<{ matchmakers: Matchmaker[]; matchmakerCount: number }>();

constructor(private http: HttpClient ,private router: Router) {}
getMatchmakers(matchmakersPerPage: number, currentPage: number) { 
  const queryParams = `?pagesize=${matchmakersPerPage}&page=${currentPage}`; 
  this.http.get<{message: string; matchmakers:
any,maxMatchmakers:number}>('http://localhost:3000/api/matchmaker'+ queryParams)
.pipe(
    map(matchmakerData => {
      return {
        matchmakers: matchmakerData.matchmakers.map(matchmaker => {
          return {
            title: matchmaker.title,
            content: matchmaker.content,
            id: matchmaker._id,
            imagePath: matchmaker.imagePath,
            cityName:matchmaker.cityName,
            firstName:matchmaker.firstName,
            lastName: matchmaker.lastName,
            mainPhone: matchmaker.mainPhone,
            secondPhone: matchmaker.secondPhone,
            ageRange: matchmaker.ageRange,
            age:matchmaker.age,
            academy: matchmaker.academy,
            remark: matchmaker.remark,
            areaToSale: matchmaker.areaToSale
          };
        }),
      /*  locations: noteData.locations.map(note => {
          return {
            city: note._id,
            count: note.count
          };
        }),*/
        maxMatchmakers: matchmakerData.maxMatchmakers
      };
    })
  )
  .subscribe(transformedMatchmakerData => {
    this.matchmakers = transformedMatchmakerData.matchmakers;
    //this.locations = transformedNoteData.locations;
    this.matchmakersUpdated.next({
      matchmakers: [...this.matchmakers],
      //locations: [...this.locations],
      matchmakerCount: transformedMatchmakerData.maxMatchmakers
    });
  });
}


getMatchmakerUpdateListener() {
return this.matchmakersUpdated.asObservable();
}
getMatchmaker(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      cityName:string;
      firstName:string,
      lastName: string,
      mainPhone: string,
      secondPhone: string,
      ageRange: string,
      age:string,
      academy: string,
      remark: string,
      areaToSale: string
    }>("http://localhost:3000/api/matchmaker/" + id);
  }


addMatchmaker(title: string, content: string, image: File, cityName:string,
  firstName: string,
  lastName:string,
  mainPhone:string,
  secondPhone: string,
  ageRange: string,
  age:string,
  academy:string,
  remark: string,
  areaToSale:string
  /*,address:string*/) {
  const matchmakerData = new FormData();
  matchmakerData.append("title", title);
  matchmakerData.append("content", content);
  matchmakerData.append("image", image, title);
  matchmakerData.append("cityName",cityName);
  matchmakerData.append("firstName", firstName);
  matchmakerData.append("lastName", lastName);
  matchmakerData.append("mainPhone", mainPhone);
  matchmakerData.append("secondPhone", secondPhone);
  matchmakerData.append("ageRange", ageRange);
  matchmakerData.append("age",age);
  matchmakerData.append("academy", academy);
  matchmakerData.append("remark", remark);
  matchmakerData.append("areaToSale", areaToSale);
  this.http
    .post<{ message: string; note: Matchmaker }>(
      "http://localhost:3000/api/matchmaker",
      matchmakerData
    )
    .subscribe(responseData => {
      this.router.navigate(["/"]);
    });
}

updateMatchmaker(id: string, title: string, content: string, image: File ,cityName:string,
  firstName: string,
lastName:string,
mainPhone:string,
secondPhone: string,
ageRange: string,
age:string,
academy:string,
remark: string,
areaToSale:string/*imagePath:string,address*/) {
    let matchmakerData: Matchmaker | FormData;
    if (typeof /*imagePath*/image === "object") {
        matchmakerData = new FormData();
        matchmakerData.append("id", id);
        matchmakerData.append("title", title);
        matchmakerData.append("content", content);
        matchmakerData.append("image", image, title);
        matchmakerData.append("cityName",cityName);
        matchmakerData.append("firstName", firstName);
        matchmakerData.append("lastName", lastName);
        matchmakerData.append("mainPhone", mainPhone);
        matchmakerData.append("ageRange", ageRange);
        matchmakerData.append("age",age);
        matchmakerData.append("academy", academy);
        matchmakerData.append("remark", remark);
        matchmakerData.append("areaToSale", areaToSale);  
       // candidateData.append("address", address); 
    // candidateData.append(/*"image"*/"imagePath", imagePath);
    } else {
        matchmakerData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        cityName:cityName,
        firstName:firstName,
        lastName:lastName,
        mainPhone:mainPhone,
        secondPhone: secondPhone,
        ageRange: ageRange,
        age:age,
        academy:academy,
        remark: remark,
        areaToSale:areaToSale
      
      //, address:address
      };
    }
    this.http
      .put("http://localhost:3000/api/matchmaker/" + id, matchmakerData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteMatchmaker(matchmakerId: string) {
    return this.http
      .delete("http://localhost:3000/api/matchmaker/" + matchmakerId);
  }

}   