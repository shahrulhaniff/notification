import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], nama_kumpulan: string): any[] {
    if(!items) return [];
    if(!nama_kumpulan) return items;
    nama_kumpulan = nama_kumpulan.toLowerCase();
    return items.filter( it => {
      return it.name.toLowerCase().includes(nama_kumpulan); // only filter country name
    });
  }
}
