import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }
    searchTerm = searchTerm.toLowerCase();

    return items.filter(item => {
      // Filtrar por nombre del elemento principal
      if (item.name.toLowerCase().includes(searchTerm)) {
        return true;
      }
      // Filtrar por nombre de eventos
      const filteredEvents = item.events.filter(event =>
        event.name_father.toLowerCase().includes(searchTerm) ||
        event.name_subevent.toLowerCase().includes(searchTerm)
      );
      // Si hay eventos filtrados, mantener el elemento principal
      return filteredEvents.length > 0;
    });
  }
}
