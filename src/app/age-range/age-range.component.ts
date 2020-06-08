import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'age-range',
  templateUrl: './age-range.component.html',
  styleUrls: ['./age-range.component.css']
})
export class AgeRangeComponent implements OnInit {

 
  @Input()
  myControl= new FormControl();

  //@Input()
  //control:FormControl;
  
  
  options: string[] = ['25-30','28-35', '30-40','40 + ','23-26 ', '20-24', '18-22','לא רלבנטי'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
