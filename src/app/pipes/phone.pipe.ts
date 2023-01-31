import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  /**
   * formats US number to its more readable version
   * @param value a string or number of length 10
   * @returns formatted phone
   */
  transform(value: number | string): string {
    if (value.toString().length === 10) {
      const charArr = value.toString().split('');
      charArr.unshift('(');
      charArr.splice(4, 0, ') ');
      charArr.splice(8, 0, ' - ');
      return charArr.join('');
    }
    return value.toString();
  }
}
