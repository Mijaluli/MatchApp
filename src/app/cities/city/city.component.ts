import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
//import { EventEmitter } from 'protractor';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

 //declare this EventListener in order to listen on it in the parent component.


  myControl = new FormControl();
 
  cities: string[] = ['Ashdod', 'Tel Aviv', 'Ashkelon','Netivot'];
  filteredCities: Observable<string[]>;
  //@Output() onSelectValue = new EventEmitter();
  @Output() em = new EventEmitter();

  //  @Input() filterValue :string;//insert in order to input
    
  ngOnInit() {
    this.filteredCities = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  constructor() { }
  public _filter(value: string): string[] {
     const  filterValue = value.toLowerCase();
    // this. filterValue = value.toLowerCase();
    return this.cities.filter(cities => cities.toLowerCase().includes(/*this.*/filterValue));
  }
 

  onChange() {
    //this.onSelectValue.emit( {myControl : this.myControl} );
 }

 //test(value){
 //in set value emit the value to parent
 //this.em.emit(value);
//}
}
