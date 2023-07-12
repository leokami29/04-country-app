import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

  // crear un emmiter cou un @Output
  @Output()
  public onValue = new EventEmitter<string>()

  emiteValue( value: string) : void {
    this.onValue.emit(value)
  }
  
}
