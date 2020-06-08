import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'hair-color',
  templateUrl: './hair-color.component.html',
  styleUrls: ['./hair-color.component.css']
})
export class HairColorComponent implements OnInit {

  @Input()
  myControl= new FormControl();

  //@Input()
  //control:FormControl;
  
  
  options: string[] = ['חום כהה', 'חום בהיר','שחור','בלונדיני','לא רלבנטי'];
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


