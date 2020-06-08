import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'eye-color',
  templateUrl: './eye-color.component.html',
  styleUrls: ['./eye-color.component.css']
})
export class EyeColorComponent implements OnInit {

  @Input()
  myControl= new FormControl();

  //@Input()
  //control:FormControl;
  
  
  options: string[] = ['חום כהה', 'דבש','ירוק','כחול',"לא רלבנטי"];
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


