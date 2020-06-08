import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import { Candidate } from './candidate.model';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { City } from '../cities/city.model';
@Injectable({providedIn: "root"}) // this will add this service to the providers array in app.module.ts
export class CandidatesService {
  private cities: City[] = [];
private candidates: Candidate[] = [];
private candidatesUpdated = new Subject<{ candidates: Candidate[]; candidateCount: number }>();



constructor(private http: HttpClient ,private router: Router) {}
getCandidates(notesPerPage: number, currentPage: number) { 
  const queryParams = `?pagesize=${notesPerPage}&page=${currentPage}`; 
  this.http.get<{message: string; candidates:
any,maxCandidates:number}>('http://localhost:3000/api/candidates'+ queryParams)
.pipe(
    map(candidateData => {
      return {
        candidates: candidateData.candidates.map(candidate => {
          return {
            title: candidate.title,
            content: candidate.content,
            id: candidate._id,
            imagePath: candidate.imagePath,
            cityName:candidate.cityName,
            firstName:candidate.firstName,
            lastName: candidate.lastName,
             mainPhone: candidate.mainPhone,
            secondPhone: candidate.secondPhone,
            ageRange: candidate.ageRange,
            age:candidate.age,
            academy:candidate.academy,
            remark: candidate.remark,
            area:candidate.area,
            female:candidate.female,
            colorEye:candidate.colorEye,
            colorHair:candidate.colorHair,
            colorSkin:candidate.colorSkin,
            eda:candidate.eda,
            hobies:candidate.hobies,
            street:candidate.street,
            sector:candidate.sector,
          };
        }),
      /*  locations: noteData.locations.map(note => {
          return {
            city: note._id,
            count: note.count
          };
        }),*/
        maxCandidates: candidateData.maxCandidates
      };
    })
  )
  .subscribe(transformedNoteData => {
    this.candidates = transformedNoteData.candidates;
    //this.locations = transformedNoteData.locations;
    this.candidatesUpdated.next({
      candidates: [...this.candidates],
      //locations: [...this.locations],
      candidateCount: transformedNoteData.maxCandidates
    });
  });
}


getCandidateUpdateListener() {
return this.candidatesUpdated.asObservable();
}
getCandidate(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      cityName:string;
      firstName:string;
      lastName: string;
      mainPhone: string;
      secondPhone: string;
      ageRange: string;
      age: string;
      academy: string;
      remark: string;
      area: string;
      female:string;
      colorEye: string;
      colorHair: string;
      colorSkin: string;
      eda: string;
      hobies: string;
      street:string ;
      sector:string;
    }>("http://localhost:3000/api/candidates/" + id);
  }
/*
  addCandidate(title: string, content: string , image:File{
    //const candidate: FormData = {title: title, content: content, imagePath: imagePath};

    const candidate = new FormData();
    candidate.append("title", title);
    candidate.append("content", content);
    candidate.append("imagePath",image, title);

//alert(candidate.getAll);
     this.http.post<{message: string; candidates:Candidate;}>
     ('http://localhost:3000/api/candidates',candidate)
     .subscribe(responseData => {
       // this.router.navigate(["/"]);
       this.router.navigate(["/"]);
    });
}

*/

addCandidate(title: string, content: string, image: File, cityName:string
  ,firstName:string,
  lastName: string,
  mainPhone: string,
  secondPhone: string,
  ageRange: string,
  age:string,
  academy: string,
  remark: string,
  area: string,
  female:string,
  colorEye: string,
  colorHair: string,
  colorSkin: string, 
  eda: string,
  hobies: string,
  street:string,
  sector:string ){
  const noteData = new FormData();
  noteData.append("title", title);
  noteData.append("content", content);
  noteData.append("image", image, title);
  noteData.append("cityName",cityName);
  noteData.append("firstName", firstName);
  noteData.append("lastName", lastName);
  noteData.append("mainPhone", mainPhone);
  noteData.append("secondPhone", secondPhone);
  noteData.append("ageRange", ageRange);
  noteData.append("age", age);
  noteData.append("academy", academy);
  noteData.append("remark", remark);
  noteData.append("area", area);
  noteData.append("female", female);
  noteData.append("colorEye", colorEye);
  noteData.append("colorHair", colorHair);
  noteData.append("colorSkin", colorSkin);
  noteData.append("eda", eda);
  noteData.append("hobies", hobies);
  noteData.append("street", street);
  noteData.append("sector", sector);    
  this.http
    .post<{ message: string; note: Candidate }>(
      "http://localhost:3000/api/candidates",
      noteData
    )
    .subscribe(responseData => {
      this.router.navigate(["/"]);
    });
}

updateCandidate(id: string, title: string, content: string, image: File 
  ,cityName:string,
  firstName:string,
  lastName: string,
  mainPhone: string,
  secondPhone: string,
  ageRange: string,
  age:string,
  academy: string,
  remark: string,
  area: string,
  female:string,
  colorEye: string,
  colorHair: string,
  colorSkin: string, 
  eda: string,
  hobies: string,
  street:string,
  sector:string) {
    let candidateData: Candidate | FormData;
    if (typeof /*imagePath*/image === "object") {
        candidateData = new FormData();
        candidateData.append("id", id);
        candidateData.append("title", title);
        candidateData.append("content", content);
        candidateData.append("image", image, title);
        candidateData.append("cityName",cityName);
        candidateData.append("firstName", firstName);
        candidateData.append("lastName", lastName);
        candidateData.append("mainPhone", mainPhone);
        candidateData.append("secondPhone", secondPhone);
        candidateData.append("ageRange", ageRange);
        candidateData.append("age", age);
        candidateData.append("academy", academy);
        candidateData.append("remark", remark);
        candidateData.append("area", area);
        candidateData.append("female", female);
        candidateData.append("colorEye", colorEye);
        candidateData.append("colorHair", colorHair);
        candidateData.append("colorSkin", colorSkin);
        candidateData.append("eda", eda);
        candidateData.append("hobies", hobies);
        candidateData.append("street", street);
        candidateData.append("sector", sector);
       // candidateData.append("address", address); 
    // candidateData.append(/*"image"*/"imagePath", imagePath);
    } else {
        candidateData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        cityName:cityName,
        firstName:firstName,
      lastName: lastName,
      mainPhone: mainPhone,
      secondPhone: secondPhone,
      ageRange: ageRange,
      age:age,
      academy: academy,
      remark: remark,
      area:area,
      female:female,
      colorEye: colorEye,
      colorHair: colorHair,
      colorSkin: colorSkin,
      eda: eda,
      hobies: hobies,
      street:street ,
      sector:sector
      };
    }
    this.http
      .put("http://localhost:3000/api/candidates/" + id, candidateData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteCandidate(candidateId: string) {
    return this.http
      .delete("http://localhost:3000/api/candidates/" + candidateId);
  }

}   