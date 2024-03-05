import { NgModule } from '@angular/core';
import { SearchPipe } from './search.pipe'; // Ajusta la ruta de importación según la ubicación real del pipe

@NgModule({
  declarations: [SearchPipe], // Agrega el SearchPipe a las declaraciones del módulo
  exports: [SearchPipe] // Exporta el SearchPipe para que esté disponible en otros módulos
})
export class SearchPipeModule {}
