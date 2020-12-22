import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hour'
})
export class HourPipe implements PipeTransform {

  transform(hour) {
    if(hour > 11){
      return hour + ':00 PM';
    }else{
      if(hour > 9){
        return hour + ':00 AM';
      }else{
        return '0' + hour + ':00 AM';
      }
    }
  }

}
