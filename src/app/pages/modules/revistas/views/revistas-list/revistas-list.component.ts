import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-revistas-list',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule],
  templateUrl: './revistas-list.component.html',
  styleUrl: './revistas-list.component.scss'
})
export class RevistasListComponent {
  // componente.ts
  pdfPageCount = 5; // queremos mostrar solo hasta la página 5

  afterLoadComplete(pdf: any) {
    // Esto limita la navegación
    console.log("pdf",pdf);
    
    pdf.numPages = this.pdfPageCount;
  }

  
}
