import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateEposh'
})
export class DateEposhPipe implements PipeTransform {

  transform(date: number) {
    if (date == 0) {
      return 0;
    }
    let temp = new Date(date*1000);
    return `${temp.getHours()}:${temp.getMinutes()} ${temp.getUTCDate()}/${temp.getUTCMonth()+1}/${temp.getFullYear()}`;
  }

}
