import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFr'
})
export class DateFrPipe implements PipeTransform {

  transform(value: Date, format: string = 'dd/MM/yyyy'): string {
    if(!value) return 'No date found';

    const datePipe = new DatePipe('fr-FR');
    return datePipe.transform(value, format)!;
  }
}
