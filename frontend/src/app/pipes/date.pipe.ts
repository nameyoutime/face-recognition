import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(val : number) : number {  
    console.log(val);
    return Math.sqrt(val);  
  }  

}
