import { Pipe, PipeTransform } from '@angular/core';
/**
 * Filter array with given arguments also as array
 */
@Pipe({
  name: 'filterColumns'
})
export class FilterColumnsPipe implements PipeTransform {

  transform(value: any[], args: any[]): any {
    console.log(value, args);
    console.log(value.length > 0 && args.length > 0);
    console.log(value.length, args.length);
    if (value.length > 0 && args.length > 0) {
      console.log('was here');
      value = value.filter(val => {
        return args.indexOf(val) !== -1;
      });
    }
    console.log(value);
    return [...value];
  }

}
