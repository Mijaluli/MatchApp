import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { FormControl,FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

@Component({
  selector: 'autocomplete-auto-active-first-option-example',
  templateUrl: './autocomplete-auto-active-first-option-example.component.html',
  styleUrls: ['./autocomplete-auto-active-first-option-example.component.css']
})
export class AutocompleteAutoActiveFirstOptionExampleComponent implements OnInit {
  


  myControl= new FormControl();

  @Output() cityChange: EventEmitter<string> = new EventEmitter<string>();

  //@Input()
  //control:FormControl;
  
  
  options: string[] = ['Ashdod', 'Tel Aviv', 'Ashkelon',"Ofakim"];
  selected = 'Ashdod' ;// this.options[0];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  OnSelectedChange(){
    this.cityChange.emit(this.selected);
   
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


}
