import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor'
})
export class StatusColorPipe implements PipeTransform {

  transform(status: boolean): string {
    let color: string;

    switch (status) {
      case true:
        color = 'green';
        break;
      case false:
        color = 'red';
        break;
      default:
        color = 'black';
        break;
    }

    return color;
  }

}
