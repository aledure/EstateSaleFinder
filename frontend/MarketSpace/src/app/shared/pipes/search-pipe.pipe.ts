import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(sales: any[], searchTerm: string): any[] {
    if (!sales || !searchTerm) {
      return sales;
    }

    searchTerm = searchTerm.toLowerCase();
    return sales.filter(sale =>
      sale.title.toLowerCase().includes(searchTerm) ||
      sale.description.toLowerCase().includes(searchTerm)
    );
  }
}

